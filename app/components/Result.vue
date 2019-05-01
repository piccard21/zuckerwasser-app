<template>
  <StackLayout>
    <!-- ratio -->
    <Label :text="ratioLabel" class="h2 text-center" />

    <!-- sugar -->
    <Label text="Zucker" class="heading m-t-20" />
    <TextField
      v-model="sugarKilo"
      :isEnabled="false"
      class="input input-border"
    />

    <!-- water -->
    <Label text="Wasser" class="heading m-t-20" />
    <TextField v-model="water" :isEnabled="false" class="input input-border" />

    <!-- liquid -->
    <Label text="Gesamtmenge der Lösung" class="heading m-t-20" />
    <TextField v-model="liquid" :isEnabled="false" class="input input-border" />

    <!-- food theoretical-->
    <Label text="Theoretisch eingedicktes Futter" class="heading m-t-20" />
    <TextField
      v-model="foodTheoretical"
      :isEnabled="false"
      class="input input-border"
    />

    <!-- food in fact-->
    <Label text="Tatsächlich eingelagertes Futter" class="heading m-t-20" />
    <TextField
      v-model="foodInFact"
      :isEnabled="false"
      class="input input-border"
    />

    <!-- new calculation -->
    <Button
      text="Neue Berechnung"
      class="btn btn-primary"
      @tap="$emit('new-calc')"
    />
  </StackLayout>
</template>

<script>
export default {
  data() {
    return {};
  },
  computed: {
    ratioLabel() {
      return "Verhältnis " + this.ratio;
    },
    ratio() {
      return this.$store.state.ratio;
    },
    sugarKilo() {
      return this.$store.state.sugarKilo;
    },
    water() {
      return this.$store.state.water;
    },
    liquid() {
      return this.$store.state.overallLiquid;
    },
    foodTheoretical() {
      return this.$store.state.overallFoodTheoretical;
    },
    foodInFact() {
      return this.$store.state.overallFoodInFact;
    }
  },
  methods: {}
};
</script>

<style scoped></style>
