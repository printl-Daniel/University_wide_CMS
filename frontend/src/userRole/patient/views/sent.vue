<template>
  <div>
    <!-- TopNav-->
    <div class="header">
      <TopNav />
    </div>
    <!-- Dashboard Content -->
    <div class="page-content">
      <div class="sidebar"><SideNav /></div>
      <div class="content">
        <div class="inbox-table">
          <table>
            <thead>
              <tr>
                <th>Receiver</th>
                <th>Content</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Alfreds Futterkiste</td>
                <td class="fade-text">Hello, how are you today?</td>
                <td>Maria Anders</td>
                <td><i class="fa-solid fa-ellipsis-vertical"></i></td>
              </tr>
              <tr>
                <td>Centro comercial Moctezuma</td>
                <td class="fade-text">
                  We've been looking at your sales for the past month.
                </td>
                <td>Francisco Chang</td>
                <td><i class="fa-solid fa-ellipsis-vertical"></i></td>
              </tr>
              <tr>
                <td>Centro comercial Moctezuma</td>
                <td class="fade-text">
                  We've been looking at your sales for the past month.
                </td>
                <td>Francisco Chang</td>
                <td><i class="fa-solid fa-ellipsis-vertical"></i></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import TopNav from "../components/topNav.vue";
import SideNav from "../components/sideNav.vue";
import Table from "../components/inboxTable.vue";
export default {
  components: {
    TopNav,
    SideNav,
    Table,
  },
  mounted() {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "/css/patient/inbox.css";
    document.head.appendChild(link);
  },
};
</script>
