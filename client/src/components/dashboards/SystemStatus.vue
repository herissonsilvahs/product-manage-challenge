<template>
  <v-snackbar
    v-model="visible"
    :bottom="y === 'bottom'"
    :left="x === 'left'"
    :multi-line="mode === 'multi-line'"
    :right="x === 'right'"
    :timeout="timeout"
    :color="type"
    :top="y === 'top'"
    :vertical="mode === 'vertical'"
  >
    {{ msg }}
    <v-btn
      color="dark"
      flat
      @click="close"
    >
      Close
    </v-btn>
  </v-snackbar>
</template>

<script>
  import { mapState } from 'vuex'
  export default {
    data () {
      return {
        y: 'top',
        x: null,
        mode: '',
        timeout: 0
      }
    },
    computed: {
      ...mapState({
        visible: state => state.notifier.visible,
        msg: state => state.notifier.msg,
        type: state => state.notifier.type,
      })
    },
    methods: {
      close(){
        this.$emit('close')
      }
    }
  }
</script>