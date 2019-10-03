
<!-- 

 -->
<template>

  <div v-if="event.fields['isPublished']" :class="(isNext || isNow) ? '--upcoming' : '' " class="AgendaEvent" >

    <!-- these are "meta" type events that break up the day -->

    <!-- messaging to show if this is an "up next" event -->
    <div v-if="isNext" class="AgendaEvent-next">
      Upcoming:
    </div>

    <div v-if="isNow" class="AgendaEvent-now AgendaEvent-next">
      In Progress:
    </div>

    <!-- Type: Day -->
    <div v-if="getAgendaType(event) == 'Day' " :class="[getAgendaType(event), getExpiredClass(event)]" class="AgendaEvent-item --meta-major _grid-2-1 _grid-gap-small _align-vertically">
      <div class="AgendaEvent-item-title" v-html="$md.strip($md.render( event.fields['Name'] || ''))" />
      <div class="AgendaEvent-item-date _right-sm">{{ event.fields['Time'] | niceDate }}</div>
    </div>

    <!-- Type: End of Day -->
    <div v-else-if="getAgendaType(event) == 'Day End' " :class="[getAgendaType(event), getExpiredClass(event)]" class="AgendaEvent-item --meta-descriptor _grid-3-1 _grid-gap-small _align-vertically">
      <div class="AgendaEvent-item-title" v-html="$md.strip($md.render( event.fields['Name'] || ''))" />
      <div class="AgendaEvent-item-date _right-sm">{{ event.fields['Time'] | niceTimeDate }}</div>
    </div>

    <!-- Type: Event -->
    <div v-else-if="getAgendaType(event) == 'Event' " :class="[getAgendaType(event), getExpiredClass(event)]" class="AgendaEvent-item --meta-event _grid-2-1 _grid-gap-small _align-vertically">
      <div class="AgendaEvent-item-title" v-html="$md.strip($md.render( event.fields['Name'] || ''))" />
      <div class="AgendaEvent-item-date _right-sm">{{ event.fields['Time'] | niceTimeDate }}</div>
    </div>

    <!-- Type: Session -->
    <div v-else-if="getAgendaType(event) == 'Session' " :class="[getAgendaType(event), getExpiredClass(event)]" class="AgendaEvent-item --meta-session">
      <div class="AgendaEvent-item-title">
        <div class="--meta-session-header">Session:</div>
        <div v-html="$md.strip($md.render( event.fields['Name'] || ''))" />
      </div>
      <!-- <div class="AgendaEvent-item-date _right">{{ event.fields['Time'] | niceTimeDate }}</div> -->
    </div>

    <!-- remarks is a meta talk w/ no set speakers -->

    <!-- Type: Remarks -->
    <div v-else-if="getAgendaType(event) == 'Remarks' " :class="[getAgendaType(event), getExpiredClass(event)]" class="AgendaEvent-item --speaker">
      <StreamEvent>
        <div slot="type">{{ getAgendaType(event) }}</div>
        <div slot="date">{{ event.fields['Time'] | niceTimeDate }}</div>
        <div slot="main">
          <div class="AgendaEvent-item-name">{{ event.fields['Name'] }}</div>
        </div>
      </StreamEvent>
    </div>

    <!-- inviter speaker talks are called "speaker" -->

    <!-- Type: Keynote -->
    <div v-else-if="getAgendaType(event) == 'Keynote' " :class="[getAgendaType(event), getExpiredClass(event)]" class="AgendaEvent-item --speaker">
      <StreamEvent>
        <div slot="type">{{ getAgendaType(event) }}</div>
        <div slot="date">{{ event.fields['Time'] | niceTimeDate }}</div>
        <div slot="main">
          <div class="AgendaEvent-item-name" v-html="$md.strip($md.render( event.fields['Name'] || ''))" />
          <div class="AgendaEvent-item-speakers" v-html="$md.strip($md.render( event.fields['Speakers'] || ''))" />
        </div>
      </StreamEvent>
    </div>

    <!-- Type: Speaker -->
    <div v-else-if="getAgendaType(event) == 'Speaker' " :class="[getAgendaType(event), getExpiredClass(event)]" class="AgendaEvent-item --speaker">
      <StreamEvent>
        <div slot="type">{{ getAgendaType(event) }}</div>
        <div slot="date">{{ event.fields['Time'] | niceTimeDate }}</div>
        <div slot="main">
          <div class="AgendaEvent-item-name" v-html="$md.strip($md.render( event.fields['Name'] || ''))" />
          <div class="AgendaEvent-item-speakers" v-html="$md.strip($md.render( event.fields['Speakers'] || ''))" />
        </div>
      </StreamEvent>
    </div>

    <!-- Type: Panel -->
    <div v-else-if="getAgendaType(event) == 'Panel' " :class="[getAgendaType(event), getExpiredClass(event)]" class="AgendaEvent-item --speaker">
      <StreamEvent>
        <div slot="type">{{ getAgendaType(event) }}</div>
        <div slot="date">{{ event.fields['Time'] | niceTimeDate }}</div>
        <div slot="main">
          <div class="AgendaEvent-item-name" v-html="$md.strip($md.render( event.fields['Name'] || ''))" />
          <div class="AgendaEvent-item-speakers" v-html="$md.render( event.fields['Speakers'] || '')" />
        </div>
      </StreamEvent>
    </div>

  </div>



</template>


<script>

// import StreamCard from '~/components/StreamCard.vue'
import StreamEvent from '~/components/StreamEvent.vue'

export default {

  components: {
    // StreamCard,
    StreamEvent,
  },

  props: {
    'event': Object, // the data for the event
    'isNext': Boolean, // true when this event is a preview 
    'isNow': Boolean, // true when this event is happening within a 15 minute window
  },

  data: function () {
    return {
      // intro: this.$cytosis.find('Content.capsid-intro', this.$store.state.cytosis.tables)[0]['fields']['Markdown'],
      // banner: this.$cytosis.find('Content.capsid-banner', this.$store.state.cytosis.tables)[0]['fields']['Markdown'],
      // placeholder: this.$cytosis.find('Content.capsid-placeholder', this.$store.state.cytosis.tables)[0]['fields']['Markdown'],
    }
  },

  methods: {
    handleSubmit() {
      // todo: use axios w/ the mailchimp API instead of default mailchimp
      return false
    },

    getAgendaType(event) {
      // edit this later w/ triggers etc.
      return event.fields['Type']
      // if (agenda.fields['Type'] == 'Day' ) { return 'Day' } 
      // else if (agenda.fields['Type'] == 'Event' ) { return 'Event' } 
      // else if (agenda.fields['Type'] == 'Session' ) { return 'Session' } 
      // else if (agenda.fields['Type'] == 'Remarks' ) { return 'Remarks' } 
      // else if (agenda.fields['Type'] == 'Keynote' ) { return 'Keynote' } 
      // else if (agenda.fields['Type'] == 'Day End' ) { return 'Day End' } 
      // else if (agenda.fields['Type'] == 'Speaker' ) { return 'Speaker' } 
      // else if (agenda.fields['Type'] == 'Panel' ) { return 'Panel' } 
    },

    getExpiredClass(event) {
      const nowDate = new Date
      const now = nowDate.toISOString()

      if (now > event.fields['Time'])
        return '--expired'
    }
  }

}
</script>

