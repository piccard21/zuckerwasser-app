<template>
  <ScrollView class="form m-20">
    <StackLayout v-if="!hasResult">
      <!-- ratio -->
      <Button
        row="0"
        col="1"
        :text="ratioLabel"
        class="btn btn-primary"
        style="background: #ffc107;"
        @tap="setRatio"
      />

      <!-- ingredient -->
      <Button
        row="0"
        col="1"
        :text="ingredientLabel"
        class="btn btn-primary"
        style="background: #ffc107;"
        @tap="setIngredient"
      />

      <!-- amount -->
      <Label :text="amountLabel" class="heading m-t-20" />
      <TextField
        v-model="amount"
        :hint="unit"
        class="input input-border"
        keyboardType="number"
      />
      <Button text="Berechne" class="btn btn-primary" @tap="calculate" />
    </StackLayout>

    <!-- result -->
    <StackLayout v-else>
      <result @new-calc="hasResult = false"></result>
    </StackLayout>
  </ScrollView>
</template>

<script>
import result from "./Result";
import shared from "../mixin/index";
export default {
  components: {
    result
  },
  mixins: [shared],
  data() {
    return {
      hasResult: false
    };
  },
  computed: {
    ratioLabel() {
      return "Verhältnis: " + this.ratio;
    },
    ingredientLabel() {
      return this.ingredient;
    },
    unit() {
      return ["Gesamtmenge der Lösung", "Wasser"].includes(this.ingredient)
        ? "Liter"
        : "Kilo";
    },
    amountLabel() {
      return "Menge in " + this.unit;
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
        value: parseFloat(this.amount)
      });

      this.hasResult = true;
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
