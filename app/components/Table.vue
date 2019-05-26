<template>
  <ScrollView>
    <GridLayout rows="auto, auto, *, *" columns="*,*,*,*,*" class="m-10">
      <!-- ratio -->
      <Button
        colSpan="5"
        col="0"
        row="0"
        :text="ratioLabel"
        class="btn btn-primary"
        style="background: #ffc107;"
        @tap="setRatio"
      />

      <!-- headers -->
      <Label
        v-for="(f, i) in fields"
        :key="i"
        textWrap="true"
        :col="i"
        row="1"
        class="text-center"
      >
        <FormattedString>
          <Span :text="f" fontWeight="bold" />
          <Span
            v-if="f.includes('\n')"
            :text="foodLost"
            color="grey"
            fontSize="11"
            fontStyle="italic"
          />
        </FormattedString>
      </Label>

      <!-- units -->
      <Label
        v-for="(u, i) in units"
        :key="i"
        textWrap="true"
        class="text-center text-primary p-10 b-border"
        :text="u"
        :col="i"
        row="2"
      />

      <GridLayout
        class="text-center"
        rows="*,*,*,*,*,*,*,*,*,*,*,*,*,*,*,*,*,*,*,*"
        columns="*"
        colSpan="5"
        row="3"
      >
        <GridLayout
          v-for="(rowData, rIndex) in data"
          :key="rIndex"
          class="text-center"
          col="0"
          :row="rIndex"
          rows="*"
          columns="*,*,*,*,*"
        >
          <Label
            v-for="(r, i) in rowData"
            :key="i"
            textWrap="true"
            class="p-5"
            row="0"
            :col="i"
            :text="r"
          />
        </GridLayout>
      </GridLayout>
    </GridLayout>
  </ScrollView>
</template>

<script>
import tableData from "../lib/data";

export default {
  computed: {
    data() {
      return tableData.data[this.$store.state.ratio];
    },
    fields() {
      return tableData.fields;
    },
    foodLost() {
      return this.$store.getters.foodLost;
    },
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
    units() {
      console.info(tableData.units);
      return tableData.units;
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
</script>

<style scoped>
.b-border {
  border-color: #6c757d;
  border-width: 0 0 1 0;
  font-size: 11;
}
</style>
