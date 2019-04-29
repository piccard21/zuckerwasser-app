<template>
  <ScrollView class="m-20">
    <StackLayout class="home-panel form input-field">
      <!-- ratio -->
      <Button
        row="0"
        col="1"
        :text="ratioLabel"
        class="btn btn-primary"
        style="background: #ffc107;"
        @tap="setRatio"
      />

      <!-- <StackLayout class="hr-light m-20" /> -->

      <!-- sugar -->
      <Label text="Zucker" class="heading m-t-20" />
      <TextField
        v-model="sugarKilo"
        hint="Kilo"
        class="input input-border"
        keyboardType="number"
      />
      <!-- water -->
      <Label text="Wasser" class="heading m-t-20" />
      <TextField
        v-model="water"
        hint="Liter"
        class="input input-border"
        keyboardType="number"
      />
      <!-- liquid -->
      <Label text="Gesamtmenge der Lösung" class="heading m-t-20" />
      <TextField
        v-model="liquid"
        hint="Liter"
        class="input input-border"
        keyboardType="number"
      />
      <!-- food theoretical-->
      <Label text="Theoretisch eingedicktes Futter" class="heading m-t-20" />
      <TextField
        v-model="foodTheoretical"
        hint="Liter"
        class="input input-border"
        keyboardType="number"
      />
      <!-- food in fact-->
      <Label text="Tatsächlich eingelagertes Futter" class="heading m-t-20" />
      <TextField
        v-model="foodInFact"
        hint="Kilo"
        class="input input-border"
        keyboardType="number"
      />
      <Button text="Alles zurücksetzen" class="btn btn-primary" @tap="reset" />
    </StackLayout>
  </ScrollView>
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
    ratio: {
      get() {
        return this.$store.state.ratio;
      },
      set(value) {
        this.$store.commit("setRatio", { value });
      }
    },
    sugarKilo: {
      get() {
        return this.$store.state.sugarKilo;
      },
      set(value) {
        this.$store.dispatch("setSugarKilo", { value });
      }
    },
    water: {
      get() {
        return this.$store.state.water;
      },
      set(value) {
        this.$store.dispatch("setWater", { value });
      }
    },
    liquid: {
      get() {
        return this.$store.state.overallLiquid;
      },
      set(value) {
        this.$store.dispatch("setOverallLiquid", { value });
      }
    },
    foodTheoretical: {
      get() {
        return this.$store.state.overallFoodTheoretical;
      },
      set(value) {
        this.$store.dispatch("setOverallFoodTheoretical", {
          value
        });
      }
    },
    foodInFact: {
      get() {
        return this.$store.state.overallFoodInFact;
      },
      set(value) {
        this.$store.dispatch("setOverallFoodInFact", {
          value
        });
      }
    }
  },
  methods: {
    setRatio() {
      action("Wählen Sie ein Verhältnis?", "Abbruch", ["1:1", "3:2"]).then(
        result => {
          console.log(result); // Logs the selected option for debugging.
          this.ratio = result;
          this.reset();
        }
      );
    },
    reset() {
      this.sugarKilo = this.water = this.liquid = this.foodTheoretical = this.foodInFact = undefined;
    }
  }
};
</script>

<style scoped></style>
