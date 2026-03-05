<!-- usage: 
 http://localhost:5175/resume?id=jan-zheng
  -->
<script>
  import { onMount, tick } from 'svelte';
  import Icon from '@iconify/svelte';
	import SocialBox from '@components/blogalog/subcomponents/Socialbox.svelte'

  import { JSONEditor } from 'svelte-jsoneditor'

  let message;
  export let state = undefined; // When set: 'view', 'json', 'split'
  // export let state = 'view'; // 'view', 'json'

  import MarkdownIt from 'markdown-it';
  import markdownItAttrs from 'markdown-it-attrs';
  const md = new MarkdownIt({ breaks: true, html: true, linkify: true });
  md.use(markdownItAttrs);

  export let resumeJson = {};
  import { writable, derived } from 'svelte/store'

  export let id;
  export let preview;

  import sheet, { Sheet } from '@yawnxyz/sheetlog';
  import { persisted } from 'svelte-persisted-store'
  export let savedResumeText = persisted(`resumeText-${id}`, '');
  export let resumeText = writable('');
  let resumeTextWrapper = derived(resumeText, store => ({text: store}));
  let socialEmail="", socialText="";
  
  export let isLoading = true, hasUnsaved = false;
  

  // import { PUBLIC_SHEET_URL } from '$env/static/public';
  let PUBLIC_SHEET_URL = "https://script.google.com/macros/s/AKfycbw_Vzxf_O4YaijlPK_bksDF9az8vs2PtspU_wZH6E-j1JurWNfPjP9kDQbpSOf4cgud/exec"

  sheet.setup({ 
    sheetUrl: PUBLIC_SHEET_URL,
    sheet: "Resumes"
  });

  // import { nanoid } from 'nanoid'

  export let initialResumeJson = {};

  // grabbable handles
  let startX, startWidth;
  let panelWidth = 700; // Initial width of the panel

  let previousId = id;
  $: if (id !== previousId) {
    // ID changed, update the persisted store
    savedResumeText = persisted(`resumeText-${id}`, '');
    previousId = id;
  }

  function handleSaveShortcut(event) {
    if (event.metaKey && event.key === 's') {
      event.preventDefault(); // Prevent the default browser save action
      saveResume();
    }
  }

  // Add these variables for TOC tracking
  let sections = [];
  let activeSectionId = '';

  // Function to handle intersection observer
  function createSectionObserver() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          activeSectionId = entry.target.id;
        }
      });
    }, {
      rootMargin: '-20% 0px -80% 0px' // Adjust these values to control when sections become "active"
    });

    // Observe all section elements
    sections.forEach(section => {
      const element = document.getElementById(section.id);
      if (element) observer.observe(element);
    });
  }

  // Update sections when resumeJson changes
  $: if (resumeJson?.meta?.order) {
    sections = resumeJson.meta.order
      .filter(key => resumeJson[key] || (key === 'about' && resumeJson.basics?.about))
      .map(key => ({
        id: key,
        label: resumeJson.meta?.sections?.find(s => s.name === key)?.label || 
               key.charAt(0).toUpperCase() + key.slice(1)
      }));
  }

  onMount(async () => {
    window.addEventListener('keydown', handleSaveShortcut);
    
    panelWidth = window.innerWidth / 2; // Set to half of the window width
    isLoading = true;


    // if id is given, we try to load it from the src instead of just memory
    // if($savedResumeText)  {
    //   // use a stored resume — esp. for dev
    //   $resumeText = $savedResumeText
    //   try {
    //     resumeJson = JSON.parse($resumeText)
    //   } catch(e) {}
    //   isLoading = false;
    //   return
    // }
    if (Object.keys(initialResumeJson).length > 0) {
      resumeJson = initialResumeJson;
      $resumeText = JSON.stringify(resumeJson, null, 2);
      isLoading = false;
      return;
    }

    isLoading = false;
    return () => {
      window.removeEventListener('keydown', handleSaveShortcut);
    };
  });

  $: if($resumeText) {
    try {
      resumeJson = JSON.parse($resumeText)
      socialEmail = resumeJson.basics?.email;
      socialText = resumeJson.basics?.profiles.map(p => p.url + '\n').join('');
      console.log('loaded resumeJson', resumeJson)
    } catch(e) {
      console.error('[resumeText] error:', e, $resumeText)
    }
  }

  
  // content / json change
  function handleChange(updatedContent, previousContent, { contentErrors, patchResult }) {
    console.log('[handleChange]: ', { updatedContent, previousContent, contentErrors, patchResult })

    $resumeText = updatedContent.text || JSON.stringify(updatedContent.json, null, 2);
    resumeJson = JSON.parse($resumeText);
    hasUnsaved = true;
    message = "unsaved changes";
    socialEmail = resumeJson.basics?.email;
    socialText = resumeJson.basics?.profiles.map(p => p.url + '\n').join('');
  }




  function initDrag(e) {
    startX = e.clientX;
    startWidth = panelWidth;
    document.addEventListener('mousemove', doDrag, false);
    document.addEventListener('mouseup', stopDrag, false);
  }

  function doDrag(e) {
    const newWidth = startWidth + e.clientX - startX;
    panelWidth = newWidth > 0 ? newWidth : 0; // Prevent negative width
  }

  function stopDrag() {
    document.removeEventListener('mousemove', doDrag, false);
    document.removeEventListener('mouseup', stopDrag, false);
  }



  async function saveResume() {
    try {
      if(!id) {
        message = "Please enter an id!"
        console.error(message)
        return; 
      }
      message = "saving"

      // Make sure we're using the correct persisted store for current ID
      savedResumeText = persisted(`resumeText-${id}`, '');
      let saveObj = { Id: id, Resume: $resumeText}
      $savedResumeText = $resumeText

      let results = await sheet.update(saveObj, {
        "id": id,
        "idColumn": "Id",
      });
  
      // could fetch + diff, but would take up an action (and be slower)
      // SOMETIMES GOOGLE SHEETS DOESN'T SEEM TO SAVE? (or update the sheets interface?)
      console.log('saveResume:', saveObj, id, 'results', results)
      message = "saved!"
      hasUnsaved = false // super naive impl

    } catch(e) {
      console.error('error saving resume', e)
      message = "error saving!"
    }
  }

  let resumeOrder = [
    'about',
    'work',
    'education',
    'publications',
    'certificates',
    'awards',
    'talks',
    'writings',
    'media',
    'interests',
    'skills',
    'roles',
    'volunteering',
    'languages',
    'projects',
    'references'
  ];

  onMount(() => {
    createSectionObserver();
  });

</script>


<svelte:head>
  <!-- <title>{`${resumeJson?.basics?.name} | biosketch` || 'Resume not found!'}</title> -->
  <!-- <title>{`${resumeJson?.basics?.name} | ${id}` || 'Resume not found!'}</title> -->
  <title>{`${id || resumeJson?.basics?.name} | Resume` || 'Resume not found!'}</title>
</svelte:head>

<div class='Resume'>
  {#if isLoading}
    <div class="text-center h-screen w-screen flex flex-row items-center justify-center | text-3xl text-slate-300 serif">
      Loading Resume...
    </div>
  {:else}
    {#if state}
      <div class="preview-controls | mx-4 my-2 flex gap-2 items-center || print:hidden">
        <div class="preview-mode | flex gap-0 | text-sm items-baseline">
          <button class="button | {state == 'json' ? 'active' : ''} border-l-2 border-y-2 rounded-s-xl" on:click="{() => state = 'json'}">JSON</button>
          <button class="button | {state == 'split' ? 'active' : ''} border-y-2" on:click="{() => state = 'split'}">Split</button>
          <button class="button | {state == 'view' ? 'active' : ''} border-r-2 border-y-2 rounded-e-xl" on:click="{() => state = 'view'}">View</button>
        </div>
        <input type="text" class="px-2 py-1 my-0" bind:value={id} />
        <button class="Btn-text | " on:click={() => saveResume()}>Save</button>
        {#if message}
          <span class="text-slate-500 ml-2">{message}</span>
        {/if}
        <button class="Btn-text | ml-4" on:click="{() => window.print()}">Print</button> 
        <div class="text-xs text-slate-500 ml-2">for best print results, use settings: "margins: minimum" with no headers/footers</div>
      </div>
    {/if}

    <div class="flex gap-4 px-4">
      {#if state && (state === 'json' || state === 'split')}
        <div class="view-json | h-screen sticky top-0 || print:hidden"
          style={`width: ${state==='split' && (panelWidth+"px") || '100%'};`}>
          <JSONEditor content={$resumeTextWrapper} mode="text" onChange="{handleChange}" />
        </div>
        <div class="handlebar {state!=='split' && 'hidden'}" on:mousedown={initDrag} role="button" tabindex="0"></div>
      {/if}
      
      {#if !state || state === 'view' || state === 'split'}
        <div class="view-resume flex-1">
          {#if resumeJson}
            <div class="resume | container mx-auto max-w-[56ch] p-4 {resumeJson?.meta?.classes||""}" >
          
              <!-- basic profile information -->
              <div class="basics | ">
                <div class="md:flex-row flex flex-col md:gap-6">
                  <div class="md:pt-2">
                    {#if resumeJson.basics?.image}
                      <img src={resumeJson.basics?.image} alt="{resumeJson.basics?.name}" class="rounded-full min-w-24 w-24 h-24 object-cover" />
                    {/if}
                  </div>
                  <div class="flex flex-col flex-1">
                    <div class="flex flex-col flex-1">
                      <h1 class="text-2xl font-medium pt-4 pb-2">
                        {resumeJson.basics?.name}{resumeJson.basics?.title ? `, ${resumeJson.basics.title}` : ''}
                      </h1>
                      <div class="basics-primary text-sm text-slate-800 | mb-2">
                        <div class="label mb-1">{resumeJson.basics?.label}</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="basics-summary mt-6 mb-2">{@html md.render(resumeJson.basics?.summary || '')}</div>
                <div class="basics-primary text-sm text-slate-500 | mb-2">
                  <div class="locationtext-sm">
                    {#if resumeJson.basics?.location?.address}{resumeJson.basics.location.address}{#if resumeJson.basics.location.city || resumeJson.basics.location.region || resumeJson.basics.location.countryCode}, {/if}{/if}
                    {#if resumeJson.basics?.location?.city}{resumeJson.basics.location.city}{#if resumeJson.basics.location.region || resumeJson.basics.location.countryCode}, {/if}{/if}
                    {#if resumeJson.basics?.location?.region}{resumeJson.basics.location.region}{#if resumeJson.basics.location.countryCode}, {/if}{/if}
                    {resumeJson.basics?.location?.countryCode||''}
                  </div>
                </div>
                <div class="basics-secondary text-sm mt-4">
                  {#if socialEmail || socialText}
                    <div class="socialbox mb-2 ">
                      <SocialBox classes="block" showFullLinks={true} iconClass="text-xl min-w-6 text-center mr-6" linkClass="flex items-center mb-2 hover:text-blue-700 hover:underline" email={socialEmail} socialText={socialText}  />
                    </div>
                  {/if}
                </div>
              </div>
          
              {#each resumeJson.meta?.order || resumeOrder as key}
                {#if key=='about' && resumeJson.basics?.about}
                  <div class="section about" id="about">
                    <div class="title {resumeJson.meta?.sections?.find(s => s.name === key)?.titleClass}">
                      {resumeJson.meta?.sections?.find(s => s.name ===key)?.label || "About"}
                    </div>
                    {#if resumeJson.basics?.about}
                      <div class="mdpara text-sm">{@html md.render(resumeJson.basics?.about||'')}</div>
                    {/if}
                  </div>
                  {#if resumeJson.basics?.notes}
                    <div class="mt-2 notes">
                      <ul>
                        {#each resumeJson.basics?.notes as note (note)}
                          <li class="text-sm">{note}</li>
                        {/each}
                      </ul>
                    </div>
                  {/if}
                {/if}

                <!-- work -->
                {#if key=='work' && resumeJson[key]}
                  <div class="section work" id="work">
                    <div class="title {resumeJson.meta?.sections?.find(s => s.name === key)?.titleClass}">
                      {resumeJson.meta?.sections?.find(s => s.name === key)?.label || "Work Experience"}
                    </div>
                    <div class="items">
                      {#each resumeJson.work as work}
                        <div class="item work-item | mb-4 | flex gap-2">
                          <!-- <div class="work-logo left | flex flex-col justify-center items-center">
                            {#if work.image}
                              <div class="w-16 h-16">
                                <img src="{work.image}" alt="{work.name}" class="work-image w-16 h-16 object-contain">
                              </div>
                            {:else}
                              <div class="w-12 h-12 flex justify-center items-center">
                                <Icon class="w-8 h-8 text-slate-400" icon="basil:desktop-outline" />
                              </div>
                            {/if}
                            <div class="border-l-2 border-slate-100 flex-1"></div>
                          </div> -->
                          <div class="work-details right | text-sm leading-normal | {work.image && ''}">
                            <div class="work-primary">
                              {#if work.name}<h2 class="name sub-title font-medium">{work.name}</h2>{/if}
                              {#if work.position}<div class="position">{work.position}</div>{/if}
                            </div>
                            <div class="work-secondary | text-slate-500 antialiased">
                              {#if work.startDate}<span class="dates">{work.startDate} - {work.endDate ? work.endDate : 'present'}</span>{/if}{#if work.location}&nbsp;· <span class="location">{work.location}</span>{/if}
                            </div>
                            <div class="work-body | mt-2">
                              {#if work.description}<div class="description">{work.description}</div>{/if}
                              {#if work.highlights && work.highlights.length}
                                <div class="highlights | mt-1">
                                  <ul>
                                    {#each work.highlights as highlight}
                                      <li class="p0">{@html md.render(highlight)}</li>
                                    {/each}
                                  </ul>
                                </div>
                              {/if}
                              {#if work.media && work.media.length}
                                <ul class="media">
                                  {#each work.media as media}
                                    <li class="media-item ">
                                      <div>
                                        {#if media.url}
                                          <a href="{media.url}" target="_blank" rel="noopener noreferrer">
                                            <span class="">{media.title} - {media.date} ({media.platform})</span>
                                          </a>
                                        {:else}
                                          <div class="">{media.title} - {media.date} ({media.platform})</div>
                                        {/if}
                                        <div class="summary">{media.summary}</div>
                                      </div>
                                    </li>
                                  {/each}
                                </ul>
                              {/if}
                              
                            </div>  
                          </div>
                        </div>
                      {/each}
                    </div>
                  </div>
                {/if}

                <!-- education -->
                {#if key=='education' && resumeJson[key]}
                  <div class="section education" id="education">
                    <div class="title {resumeJson.meta?.sections?.find(s => s.name === key)?.titleClass}">
                      {resumeJson.meta?.sections?.find(s => s.name === key)?.label || "Education"}
                    </div>
                    <div class="items">
                      {#each resumeJson.education as education}
                        <div class="item education-item | mb-4 | flex gap-2">
                          <!-- <div class="left | flex flex-col justify-center items-center">
                            {#if resumeJson.image}
                              <div class="w-16 h-16">
                                <img src="{resumeJson.image}" alt="{resumeJson.name}" class="work-image w-16 h-16 object-contain">
                              </div>  
                            {:else}
                              <div class="w-12 h-12 mt-1 flex justify-center items-center">
                                <Icon class="w-8 h-8 text-slate-400" icon="basil:book-open-outline" />
                              </div>
                            {/if}
                            <div class="border-l-2 border-slate-100 flex-1"></div>
                          </div> -->
                          <div class="right education-details | text-sm">
                            {#if education.institution}<div class="institution sub-title font-medium">{education.institution}</div>{/if}
                            {#if education.area}
                              <span class="area">{education.area}</span>
                              {#if education.studyType}· <span class="studyType">{education.studyType}</span>{/if}
                            {/if}
                            {#if education.startDate}
                              <div class="education-dates | text-slate-500">
                                <span class="dates">{education.startDate} {#if education.endDate} - {education.endDate}{:else}{/if}</span>
                                {#if education.location} · <span class="location">{education.location}</span>{/if}
                              </div>
                            {/if}
                            <div class="education-higher | mt-2">
                              {#if education.thesis}
                                {#if education.thesis.url}
                                  Thesis: <a class="" href="{education.thesis.url}" target="_blank" rel="noopener noreferrer">{education.thesis.title}</a>
                                {:else}
                                  <div class="thesis-title">Thesis: {education.thesis.title}</div>
                                {/if}
                              {/if}
                              {#if education.advisor}<div class="advisor">Advisor: {education.advisor}</div>{/if}
                            </div>
                          </div>
                        </div>
                      {/each}
                    </div>
                  </div>
                {/if}

                <!-- skills -->
                {#if key=='skills' && resumeJson[key]}
                  <div class="section skills" id="skills">
                    <div class="title {resumeJson.meta?.sections?.find(s => s.name === key)?.titleClass}">
                      {resumeJson.meta?.sections?.find(s => s.name === key)?.label || "Skills"}
                    </div>
                    <div class="items | text-sm leading-normal">
                      {#each resumeJson.skills as skill}
                        <div class="item skill | mb-8">
                          {#if skill.name}
                            <h2 class="name sub-title font-bold mt-6 text-slate-700 antialiased">{skill.name}
                              {#if skill.level}<span class="level text-sm text-slate-500">{skill.level}</span>{/if}
                            </h2>
                          {/if}
                          {#if skill.description}<div class="description">{skill.description}</div>{/if}
                          {#if skill.keywords && skill.keywords.length}
                            <div class="keywords | mt-1">
                              {#each skill.keywords as keyword}
                                <span class="keyword _tag mb-1">{keyword}</span>
                              {/each}
                            </div>
                          {/if}
                          {#if skill.subskills && skill.subskills}
                            <div class="skills | items-cols mt-2 gap-y-1 ">
                              {#each skill.subskills as subSkill}
                                <div class="sub-skill | my-2">
                                  <div class="sub-skill-name | mb-1 text-base ">{subSkill.name}</div>
                                  <div class="sub-skill-description">{subSkill.description}
                                    {#if subSkill.level}<span class="sub-skill-level text-sm text-slate-500">{subSkill.level}</span>{/if}
                                  </div>
                                  {#if subSkill.details && subSkill.details.length}
                                    <ul class="details">
                                      {#each subSkill.details as detail}
                                        <li>{detail}</li>
                                      {/each}
                                    </ul>
                                  {/if}
                                  {#if subSkill.keywords && subSkill.keywords.length}
                                    <div class="keywords mt-1">
                                      {#each subSkill.keywords as keyword}
                                        <span class="keyword _tag mb-1">{keyword}</span>
                                      {/each}
                                    </div>
                                  {/if}
                                </div>
                              {/each}
                            </div>
                          {/if}
                        </div>
                      {/each}
                    </div>
                  </div>
                {/if}

                <!-- publications -->
                {#if key=='publications' && resumeJson[key]}
                  <div class="section publications" id="publications">
                    <div class="title {resumeJson.meta?.sections?.find(s => s.name === key)?.titleClass}">
                      {resumeJson.meta?.sections?.find(s => s.name === key)?.label || "Publications"}
                    </div>
                    <div class="items | items-cols">
                      {#each resumeJson.publications as publication}
                        <div class="item publication-item">
                          {#if publication.markdown}
                            <div class="publication-details markdown | text-sm">
                                {@html md.render(publication.markdown || '')}
                            </div>
                          {:else}
                            <div class="publication-details | text-sm">
                              <h2 class="name sub-title">{publication.name}</h2>
                              <div class="publication-info | text-slate-500">
                                <span class="publisher">{publication.publisher}</span>
                                · 
                                <span class="releaseDate">{publication.releaseDate}</span>
                                · 
                                {#if publication.doi}
                                  <a href="https://doi.org/{publication.doi}" target="_blank" rel="noopener noreferrer"><span class="doi">{publication.doi}</span></a>
                                {:else if publication.url}
                                  <a href="{publication.url}" target="_blank" rel="noopener noreferrer">Link</a>
                                {/if}
                                <div class="summary">{publication.summary}</div>
                              </div>
                            </div>
                          {/if}
                        </div>
                      {/each}
                    </div>
                  </div>
                {/if}

                <!-- awards -->
                {#if key=='awards' && resumeJson[key]}
                  <div class="section awards" id="awards">
                    <div class="title {resumeJson.meta?.sections?.find(s => s.name === key)?.titleClass}">
                      {resumeJson.meta?.sections?.find(s => s.name === key)?.label || "Awards & Honors"}
                    </div>
                    <div class="items {resumeJson.roles>1 ? 'items-cols':''}">
                      {#each resumeJson.awards as award}
                        <div class="item award-item | text-sm">
                          <div class="award-details">
                            <div class="award-title sub-title mb-2">{award.title}</div>
                            <div class="award-info">
                              <span class="date">{award.date}</span> ·
                              <span class="awarder">{award.awarder}</span>
                              {#if award.summary}<div class="summary">{@html md.render(award.summary)}</div>{/if}
                            </div>
                          </div>
                        </div>
                      {/each}
                    </div>
                  </div>
                {/if}

                <!-- certificates -->
                {#if key=='certificates' && resumeJson[key]}
                  <div class="section certificates" id="certificates">
                    <div class="title {resumeJson.meta?.sections?.find(s => s.name === key)?.titleClass}">
                      {resumeJson.meta?.sections?.find(s => s.name === "certificates")?.label || "Certificates"}
                    </div>
                    <div class="items {resumeJson.roles>1 ? 'items-cols':''}">
                      {#each resumeJson.certificates as certificate}
                        <div class="item certificates-item | mb-4 ">
                          <div class="certificate-details | text-sm">
                            <h2 class="name sub-title">{certificate.name}</h2>
                            {#if certificate.url}
                              <a href="{certificate.url}" class="item-link ">{certificate.issuer}</a>
                            {:else}
                              <span class="issuer sub-title text-slate-500">{certificate.issuer}</span>
                            {/if}
                            {#if certificate.date}<span class="date text-slate-500"> · {certificate.date}</span>{/if}
                          </div>
                        </div>
                      {/each}
                    </div>
                  </div>
                {/if}
            
                {#if key=='talks' && resumeJson[key]}
                  <div class="section talks" id="talks">
                    <div class="title {resumeJson.meta?.sections?.find(s => s.name === key)?.titleClass}">
                      {resumeJson.meta?.sections?.find(s => s.name === key)?.label || "Talks & Presentations"}
                    </div>
                    <div class="items {resumeJson.roles>1 ? 'items-cols':''}">
                      {#each resumeJson.talks as talk}
                        <div class="item talk-item | text-sm">
                          <div class="talk-details | ">
                            {#if talk.url}
                              <a href="{talk.url}" class="item-link block sub-title" target="_blank" rel="noopener noreferrer">{talk.title}</a>
                            {:else}
                              <div class="sub-title">{talk.title}</div>
                            {/if}
                            <div class="talk-info | text-slate-500">
                              <div class="event">{talk.event}</div>
                              <div class="date-location">{talk.date}, {talk.location}</div>
                            </div>
                          </div>
                        </div>
                      {/each}
                    </div>
                  </div>
                {/if}
            
                {#if key=='writings' && resumeJson[key]}
                  <div class="section writings | " id="writings">
                    <div class="title {resumeJson.meta?.sections?.find(s => s.name === key)?.titleClass}">
                      {resumeJson.meta?.sections?.find(s => s.name === key)?.label || "Writings"}
                    </div>
                    <div class="items {resumeJson.roles>1 ? 'items-cols':''}">
                      {#each resumeJson.writings as writing}
                        <div class="item writings-item | text-sm">
                          <div class="image-container ">
                            {#if writing.image}
                              <div class="image pr-2 pb-2">
                                <img class="rounded-sm w-32 h-16 object-contain object-left" src="{writing.image}" alt="{writing.title}"/>
                              </div>
                            {/if}
                            <div class="desc-container">
                              {#if writing.url}
                                <a href="{writing.url}" class="item-link name block text-base">{writing.title}</a>
                              {:else}
                                <div class="name block text-base">{writing.title}</div>
                              {/if}
                              <div class="writings-info | text-slate-500">
                                <div class="datePublished">{writing.datePublished || writing.date}
                                  {#if writing.publisher}
                                    · <span class="publisher">{writing.publisher}</span>
                                  {/if}
                                </div>
                                <div class="summary">{writing.summary}</div>
                              </div>  
                            </div>
                          </div>
                          {#if writing.keywords}
                            <div class="keywords">
                              {#each writing.keywords as keyword}
                                <span class="keyword _tag">{keyword}</span>
                              {/each}
                            </div>
                          {/if}
                        </div>
                      {/each}
                    </div>
                  </div>
                {/if}
            
                {#if key=='media' && resumeJson[key]}
                  <div class="section media" id="media">
                    <div class="title {resumeJson.meta?.sections?.find(s => s.name === key)?.titleClass}">
                      {resumeJson.meta?.sections?.find(s => s.name === key)?.label || "Media Appearances"}
                    </div>
                    <div class="items {resumeJson.roles>1 ? 'items-cols':''}">
                      {#each resumeJson.media as mediaItem}
                        <div class="item media-item">
                          <div class="media-details | text-sm">
                            {#if mediaItem.url}
                              <a href="{mediaItem.url}" class="item-link sub-title block">{mediaItem.title}</a>
                            {:else}
                              <div class="sub-title">{mediaItem.title}</div>
                            {/if}
                            <div class="media-info | text-slate-500">
                              <span class="date">{mediaItem.date}</span>
                              {#if mediaItem.platform}
                                ·
                                <span class="platform">{mediaItem.platform}</span>
                              {/if}
                            </div>
                            {#if mediaItem.summary}<div class="summary">{mediaItem.summary}</div>{/if}
                            {#if mediaItem.keywords}
                              <div class="keywords | mt-1">
                                {#each mediaItem.keywords as keyword}
                                  <span class="keyword _tag">{keyword}</span>
                                {/each}
                              </div>
                            {/if}
                          </div>
                        </div>
                      {/each}
                    </div>
                  </div>
                {/if}
            
                {#if key=='interests' && resumeJson[key]}
                  <div class="section interests" id="interests">
                    <div class="title {resumeJson.meta?.sections?.find(s => s.name === key)?.titleClass}">
                      {resumeJson.meta?.sections?.find(s => s.name === key)?.label || "Interests"}
                    </div>
                    <div class="items {resumeJson.interests.length>1 ? 'items-cols':''}">
                      {#each resumeJson.interests as interest, i}
                        <div class="item interest-item | mb-4 | {interest.keywords?'block':'inline-block'}">
                          <span class="name text-base">{interest.name}{#if !interest.keywords && i < resumeJson.interests.length - 1},&nbsp;{/if}
                          </span>
                          {#if interest.keywords}
                            <div class="keywords">
                              {#each interest.keywords as keyword}
                                <span class="keyword _tag">{keyword}</span>
                              {/each}
                            </div>
                          {/if}
                        </div>
                      {/each}
                    </div>
                  </div>
                {/if}

                {#if key=='languages' && resumeJson[key]}
                  <div class="section languages" id="languages">
                    <div class="title {resumeJson.meta?.sections?.find(s => s.name === key)?.titleClass}">
                      {resumeJson.meta?.sections?.find(s => s.name === key)?.label || "Languages"}
                    </div>
                    <div class="items flex gap-12">
                      {#each resumeJson.languages as language}
                        <div class="item language-item | mb-4 ">
                          <div class="language-details | text-sm">
                            <div class="language | sub-title">{language.language}</div>
                            <div class="fluency">{language.fluency}</div>
                          </div>
                        </div>
                      {/each}
                    </div>
                  </div>
                {/if}

                {#if key=='volunteering' && resumeJson[key]}
                  <div class="section volunteering" id="volunteering">
                    <div class="title {resumeJson.meta?.sections?.find(s => s.name === key)?.titleClass}">
                      {resumeJson.meta?.sections?.find(s => s.name === key)?.label || "Volunteering"}
                    </div>
                    <div class="items {resumeJson.volunteering.length > 1 ? 'items-cols' : ''} ">
                      {#each resumeJson.volunteering as experience}
                        <div class="item volunteering-item | mb-4 ">
                          <div class="experience-details | text-sm">
                            {#if experience.url}
                              <a href="{experience.url}" class="item-link organization block text-base">{experience.organization}</a>
                            {:else}
                              <span class="organization text-base">{experience.organization}</span>
                            {/if}
                            <span class="position">{experience.position}</span>
                            {#if experience.startDate}
                              <div class="dates | _slate">
                                <span class="startDate">{experience.startDate}</span>{#if experience.endDate}&ensp;&ndash;&ensp;<span class="endDate">{experience.endDate}</span>{/if}
                              </div>
                            {/if}
                            {#if experience.summary}<div class="summary">{experience.summary}</div>{/if}
                            {#if experience.highlights}
                              <ul class="highlights">
                                {#each experience.highlights as highlight}
                                  <li class="text-sm">{highlight}</li>
                                {/each}
                              </ul>
                            {/if}
                          </div>
                        </div>
                      {/each}
                    </div>
                  </div>
                {/if}

                {#if key=='references' && resumeJson[key]}
                  <div class="section references" id="references">
                    <div class="title {resumeJson.meta?.sections?.find(s => s.name === key)?.titleClass}">
                      {resumeJson.meta?.sections?.find(s => s.name === "references")?.label || "References"}
                    </div>
                    <div class="items {resumeJson.references.length > 1 ? 'items-cols' : ''}">
                      {#each resumeJson.references as reference}
                        <div class="item references-item | mb-4 ">
                          <div class="reference-details | text-sm">
                            <h2 class="name sub-title">{reference.name}</h2>
                            <div class="reference">{reference.reference}</div>
                          </div>
                        </div>
                      {/each}
                    </div>
                  </div>
                {/if}
            
                {#if key=='roles' && resumeJson[key]}
                  <div class="section roles" id="roles">
                    <div class="title {resumeJson.meta?.sections?.find(s => s.name === key)?.titleClass}">
                      {resumeJson.meta?.sections?.find(s => s.name === "roles")?.label || "Roles"}
                    </div>
                    <div class="items {resumeJson.roles>1 ? 'items-cols':''}">
                      {#each resumeJson.roles as role}
                        <div class="item roles-item | mb-4 ">
                          <div class="role-details | text-sm">
                            {#if role.url}
                              <a href="{role.url}" class="item-link organization block sub-title">{role.organization}</a>
                            {:else}
                              <div class="organization sub-title">{role.organization}</div>
                            {/if}
                            <div class="position">{role.position}</div>
                            {#if role.startDate}
                              <div class="dates | _slate">
                                <span class="startDate">{role.startDate}</span>{#if role.endDate}&ensp;&ndash;&ensp;<span class="endDate">{role.endDate}</span>{/if}
                              </div>
                            {/if}
                            {#if role.summary}<div class="summary">{role.summary}</div>{/if}
                            {#if role.highlights}
                              <ul class="highlights">
                                {#each role.highlights as highlight}
                                  <li class="text-sm">{highlight}</li>
                                {/each}
                              </ul>
                            {/if}
                            {#if role.keywords}
                              <div class="keywords">
                                {#each role.keywords as keyword}
                                  <span class="keyword _tag">{keyword}</span>
                                {/each}
                              </div>
                            {/if}
                          </div>
                        </div>
                      {/each}
                    </div>
                  </div>
                {/if}
            
                {#if key=='projects' && resumeJson[key]}
                  <div class="section projects | " id="projects">
                    <div class="title {resumeJson.meta?.sections?.find(s => s.name === key)?.titleClass}">
                      {resumeJson.meta?.sections?.find(s => s.name === "projects")?.label || "Projects"}
                    </div>
                    <div class="items {resumeJson.roles>1 ? 'items-cols':''}">
                      {#each resumeJson.projects as item}
                        <div class="item project-item | text-sm">
                          <div class="project-header">
                            <div class="desc-container">
                              {#if item.url}
                                <a href="{item.url}" class="item-link name block sub-title">{item.name}</a>
                              {:else}
                                <h2 class="name sub-title">{item.name}</h2>
                              {/if}
                              {#if item.startDate}
                                <div class="dates | _slate">
                                  <span class="startDate">{item.startDate}</span>{#if item.endDate}&ensp;&ndash;&ensp;<span class="endDate">{item.endDate}</span>{/if}
                                </div>
                              {/if}
                              {#if item.entity}<div class="entity">{item.entity}</div>{/if}
                              {#if item.type}<div class="type">{item.type}</div>{/if}
                              {#if item.roles}<div class="roles">{item.roles.join(", ")}</div>{/if}
                            </div>
                          </div>
                          {#if item.description}<div class="description">{item.description}</div>{/if}
                          {#if item.highlights}
                            <ul class="highlights">
                              {#each item.highlights as highlight}<li class="highlight ">{highlight}</li>{/each}
                            </ul>
                          {/if}
                          {#if item.image}
                            {#if typeof item.image === 'object'}
                              <div class="image pr-2 pb-2">
                                <img class="rounded-md object-cover max-w-full" 
                                  src="{item.image.url}" 
                                  width="{item.image.width || 64}"
                                  height="{item.image.height || 64}"
                                  alt="{item.image.alt || item.name}"/>
                              </div>
                            {:else}
                              <div class="image pr-2 pb-2">
                                <img class="rounded-md max-w-64 max-h-64 object-cover" 
                                  src="{item.image}" 
                                  alt="{item.name}"/>
                              </div>
                            {/if}
                          {/if}
                          {#if item.keywords}
                            <div class="keywords">
                              {#each item.keywords as keyword}
                                <span class="keyword _tag">{keyword}</span>
                              {/each}
                            </div>
                          {/if}
                        </div>
                      {/each}
                    </div>
                  </div>
                {/if}
            
              {/each}

            </div>          
          {:else}
            No resume found at {id}
          {/if}
        </div>

        <!-- Table of Contents -->
        <div class="toc-container | hidden md:block sticky top-4 self-start ml-4 print:hidden" style="width: 200px;">
          <nav class="toc | bg-white/80 backdrop-blur-sm rounded-lg py-4 px-2 text-sm">
            <div class="font-medium mb-2">Contents</div>
            <ul class="space-y-1">
              {#each sections as section}
                <a
                  href="#{section.id}"
                  class="toc-item block py-1 px-2 -ml-2 roundedtransition-colors hover:bg-slate-100 {activeSectionId === section.id ? 'bg-slate-100 text-blue-600' : 'text-slate-600'}"
                  on:click|preventDefault={() => {
                    document.getElementById(section.id)?.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  {section.label || resumeJson.meta?.sections?.find(s => s.name === section.id)?.label || section.id}
                </a>
              {/each}
            </ul>
          </nav>
        </div>
      {/if}

    </div>
  {/if}
</div>












<style lang="scss" is:global>
  .toc-container {
    z-index: 10;
    max-height: calc(100vh - 2rem);
    overflow-y: auto;
  }
</style>