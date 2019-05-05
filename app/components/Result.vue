<template>
  <ScrollView class="form m-20">
    <StackLayout>
      <!-- ratio -->
      <Label
        :text="ratioLabel"
        class="h2 text-center calc-header p-10 m-b-30"
      />
      <ListView
        for="item in items"
        class="list-group"
        height="400"
        @itemTap="onItemTap"
      >
        <v-template>
          <GridLayout class="list-group-item" rows="*" columns="125, *, 100">
            <Label
              textWrap="true"
              row="0"
              col="0"
              :text="item.label"
              class="text-left list-group-item-heading font-weight-bold"
            />
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
          label: "Tatsächlich vorhandenes Futter"
        }
      ]
    };
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
  }
};
</script>

<style scoped>
.calc-header {
  background-color: #ffc107;
  color: #ffffff;
}
</style>
