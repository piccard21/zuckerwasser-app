export default {
  data() {
    return {
      ingredientItems: [
        { setSugarKilo: "Zucker" },
        { setWater: "Wasser" },
        { setOverallLiquid: "Gesamtmenge der Lösung" },
        { setOverallFoodTheoretical: "Theoretische Futtermenge" },
        { setOverallFoodInFact: "Tatsächliche Futtermenge" }
      ]
    };
  },
  computed: {
    amount: {
      get() {
        return this.$store.state.amount;
      },
      set(value) {
        this.$store.commit("setAmount", { value });
      }
    },
    ratio: {
      get() {
        return this.$store.state.ratio;
      },
      set(value) {
        this.$store.commit("setRatio", { value });
      }
    },
    ingredient: {
      get() {
        return this.$store.state.ingredient;
      },
      set(value) {
        this.$store.commit("setIngredient", { value });
      }
    }
  },
  methods: {
    setRatio() {
      action("Wählen Sie ein Verhältnis?", "Abbruch", ["1:1", "3:2"]).then(
        result => {
          if (result === "Abbruch" || result === this.ratio) return;
          this.ratio = result;
        }
      );
    }
  }
};
