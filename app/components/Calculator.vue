<template>
  <ScrollView class="m-20">
    <StackLayout v-if="!hasResult" class="home-panel">
      <!-- ratio -->
      <Button
        row="0"
        col="1"
        :text="ratioLabel"
        class="btn btn-primary"
        style="background: #ffc107;"
        @tap="setRatio"
      />
      <!-- ratio -->
      <Button
        row="0"
        col="1"
        :text="ingredientLabel"
        class="btn btn-primary"
        style="background: #ffc107;"
        @tap="setIngredient"
      />

      <Label :text="amountLabel" class="heading m-t-20" />
      <ListPicker
        v-model="amountIndex"
        :items="amountItems"
        :selectedIndex="0"
      />
      <Button text="Berechne" class="btn btn-primary" @tap="calculate" />
    </StackLayout>

    <StackLayout v-else>
      <result @new-calc="hasResult = false"></result>
    </StackLayout>
  </ScrollView>
</template>

<script>
import result from "./Result";
export default {
  components: {
    result
  },
  data() {
    return {
      hasResult: false,
      ingredient: "Zucker",
      ingredientItems: [
        { setSugarKilo: "Zucker" },
        { setWater: "Wasser" },
        { setOverallLiquid: "Gesamtmenge der Lösung" },
        { setOverallFoodTheoretical: "Theoretische Futtermenge" },
        { setOverallFoodInFact: "Tatsächliche Futtermenge" }
      ],
      amountIndex: 0,
      amountItems: Array.from({ length: 100 }, (v, k) => k + 1)
    };
  },
  computed: {
    ratio: {
      get() {
        return this.$store.state.ratio;
      },
      set(value) {
        this.$store.commit("setRatio", { value });
      }
    },
    ratioLabel() {
      return "Verhältnis: " + this.ratio;
    },
    ingredientLabel() {
      return this.ingredient;
    },
    amountLabel() {
      const unit = ["Gesamtmenge der Lösung", "Wasser"].includes(
        this.ingredient
      )
        ? "Liter"
        : "Kilo";
      return "Menge in " + unit;
    }
  },
  methods: {
    calculate() {
      const actionType = Object.keys(
        this.ingredientItems.find(
          item => Object.values(item)[0] === this.ingredient
        )
      )[0];

      this.$store.dispatch(actionType, {
        value: this.amountItems[this.amountIndex]
      });

      this.hasResult = true;
    },
    setRatio() {
      action("Wählen Sie ein Verhältnis?", "Abbruch", ["1:1", "3:2"]).then(
        result => {
          if (result === "Abbruch" || result === this.ratio) return;
          this.ratio = result;
        }
      );
    },
    setIngredient() {
      action(
        "Was ist der Ausgangspunkt der Berechnung?",
        "Abbruch",
        this.ingredientItems.map(item => Object.values(item)[0])
      ).then(result => {
        if (result === "Abbruch" || result === this.ingredient) return;
        this.ingredient = result;
      });
    }
  }
};
</script>

<style scoped></style>
