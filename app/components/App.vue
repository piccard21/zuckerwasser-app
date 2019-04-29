<template>
  <Page class="page" @loaded="pageLoaded">
    <ActionBar>
      <StackLayout orientation="horizontal">
        <Image
          src="res://icon"
          width="60"
          height="60"
          verticalAlignment="center"
          class="m-r-10"
        />
        <Label
          text="Zuckerwasser-Rechner"
          fontSize="24"
          verticalAlignment="center"
        />
      </StackLayout>
    </ActionBar>

    <TabView
      :selectedIndex="0"
      :android:tabBackgroundColor="primaryColor"
      :android:tabTextColor="secondaryColor"
      :android:selectedTabTextColor="secondaryColor"
      :androidSelectedTabHighlightColor="secondaryColor"
    >
      <TabViewItem title="Rechner">
        <GridLayout columns="*" rows="*">
          <Calculator />
        </GridLayout>
      </TabViewItem>
      <TabViewItem title="Tabelle">
        <TableOverview />
      </TabViewItem>
    </TabView>
  </Page>
</template>

<script>
import * as color from "tns-core-modules/color";
import * as application from "tns-core-modules/application";
import * as platform from "tns-core-modules/platform";

import Calculator from "./Calculator";
import TableOverview from "./Table";

const primaryColor = "#ffc107";
const secondaryColor = "#ffffff";

export default {
  components: {
    Calculator,
    TableOverview
  },
  computed: {
    primaryColor() {
      return primaryColor;
    },
    secondaryColor() {
      return secondaryColor;
    }
  },
  methods: {
    pageLoaded() {
      if (application.android && platform.device.sdkVersion >= "21") {
        const window = application.android.foregroundActivity.getWindow();
        window.setStatusBarColor(new color.Color(this.primaryColor).android);
      }
    }
  }
};
</script>

<style scoped>
ActionBar {
  background-color: #ffc107;
  color: #ffffff;
}

.message {
  vertical-align: center;
  text-align: center;
  font-size: 20;
  color: #333333;
}
</style>
