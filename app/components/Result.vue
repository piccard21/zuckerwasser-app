<template>
  <ScrollView class="form m-0">
    <StackLayout>
      <!-- ratio -->
      <Button
        row="0"
        col="1"
        :text="ratioLabel"
        class="btn btn-primary"
        style="background: #ffc107;"
        @tap="setRatio"
      />
      <ListView
        :key="ratio - i"
        for="(item, i) in items"
        class="list-group"
        height="400"
      >
        <v-template>
          <GridLayout class="list-group-item" rows="*" columns="125, *, 100">
            <Label
              textWrap="true"
              row="0"
              col="0"
              class="text-left list-group-item-heading"
            >
              <FormattedString>
                <Span :text="item.label" fontWeight="bold" />
                <Span
                  v-if="item.label.includes('\n')"
                  :text="foodLost"
                  color="grey"
                  fontSize="11"
                  fontStyle="italic"
                />
              </FormattedString>
            </Label>
            <Label
              textWrap="true"
              row="0"
              col="1"
              :text="item.text() | roundFloat"
              class="text-center list-group-item-text"
            />
            <Label
              textWrap="true"
              row="0"
              col="2"
              :text="
                ['Wasser', 'Gesamtlösung'].includes(item.label)
                  ? 'Liter'
                  : 'Kilo'
              "
              class="text-center list-group-item-text"
            />
          </GridLayout>
        </v-template>
      </ListView>

      <!-- new calculation -->
      <Button
        text="Neue Berechnung"
        class="btn btn-primary"
        @tap="$emit('new-calc')"
      />
    </StackLayout>
  </ScrollView>
</template>

<script>
import shared from "../mixin/index";

export default {
  filters: {
    roundFloat(val) {
      if (!val) return;

      if (val.toString().match(/^\d+\.*(\d{1,2})?$/i)) {
        return val;
      }

      return Math.round(val * 100) / 100;
    }
  },
  mixins: [shared],
  data() {
    return {
      items: [
        {
          text: () => this.sugarKilo,
          label: "Zucker"
        },
        {
          text: () => this.water,
          label: "Wasser"
        },
        {
          text: () => this.liquid,
          label: "Gesamtlösung"
        },
        {
          text: () => this.foodTheoretical,
          label: "Theoretisch eingedicktes Futter"
        },
        {
          text: () => this.foodInFact,
          label: "Tatsächlich vorhandenes Futter\n"
        }
      ]
    };
  },
  computed: {
    foodTheoretical() {
      return this.$store.state.overallFoodTheoretical;
    },
    foodInFact() {
      return this.$store.state.overallFoodInFact;
    },
    foodLost() {
      return this.$store.getters.foodLost;
    },
    ratioLabel() {
      return "Verhältnis " + this.ratio;
    },
    sugarKilo() {
      return this.$store.state.sugarKilo;
    },
    liquid() {
      return this.$store.state.overallLiquid;
    },
    water() {
      return this.$store.state.water;
    }
  },
  watch: {
    ratio() {
      this.calculate();
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
    }
  }
};
</script>

<style scoped>
.calc-header {
  background-color: #ffc107;
  color: #ffffff;
}
</style>
