<template>
  <Page
    class="page"
    @loaded="pageLoaded"
  >
    <ActionBar>
      <StackLayout orientation="horizontal">
        <Image
          src="res://icon"
          width="40"
          height="40"
          verticalAlignment="center"
          class="mr-4"
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
      <TabViewItem title="Tab 1">
        <GridLayout
          columns="*"
          rows="*"
        >
          <Label
            class="message"
            :text="msg"
            col="0"
            row="0"
          />
        </GridLayout>
      </TabViewItem>
      <TabViewItem title="Tab 2">
        <GridLayout
          columns="*"
          rows="*"
        >
          <Label
            class="message"
            text="Tab 2 Content"
            col="0"
            row="0"
          />
        </GridLayout>
      </TabViewItem>
      <TabViewItem title="Tab 3">
        <GridLayout
          columns="*"
          rows="*"
        >
          <Label
            class="message"
            text="Tab 3 Content"
            col="0"
            row="0"
          />
        </GridLayout>
      </TabViewItem>
    </TabView>
  </Page>
</template>

<script >
  import * as color from "tns-core-modules/color";
  import * as application from "tns-core-modules/application";
  import * as platform from "tns-core-modules/platform";

  const primaryColor = "#ffc107";
  const secondaryColor = "#ffffff";

  export default {
    data() {
      return {
        msg: 'Hello World 21!'
      }
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
  }
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

    .mr-4 {
        margin-right: 40px;
    }
</style>
