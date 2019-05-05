<template>
  <ScrollView>
    <GridLayout rows="auto, auto, *, *, *" columns="*,*,*,*,*">
      <!-- headers -->
      <Label
        textWrap="true"
        colSpan="5"
        col="0"
        row="0"
        class="font-weight-bold text-center text-primary"
        text="Lösungsverhältnis 1:1"
      />
      <Label textWrap="true" colSpan="3" col="0" row="1" text="" />
      <Label
        textWrap="true"
        colSpan="2"
        col="3"
        row="1"
        text="Futtermenge"
        class="font-weight-bold text-center text-primary"
      />
      <Label
        v-for="(f, i) in fields"
        :key="i"
        textWrap="true"
        class="font-weight-bold  text-center text-primary"
        :text="f"
        :col="i"
        row="2"
      />

      <!-- data -->
      <ListView
        for="(rowData, rIndex) in data"
        class="list-group"
        row="3"
        col="0"
        colSpan="5"
        height="400"
      >
        <v-template>
          <GridLayout
            class="list-group-item text-center"
            rows="*"
            columns="*,*,*,*,*"
          >
            <Label
              v-for="(r, i) in rowData"
              :key="i"
              textWrap="true"
              :row="rIndex"
              :col="i"
              :text="r"
            />
          </GridLayout>
        </v-template>
      </ListView>
    </GridLayout>
  </ScrollView>
</template>

<script>
import tableData from "../lib/data";

export default {
  computed: {
    fields() {
      return tableData.fields;
    },
    data() {
      console.info(tableData.data[this.$store.state.ratio]);
      return tableData.data[this.$store.state.ratio];
    }
  },
  methods: {}
};
</script>
