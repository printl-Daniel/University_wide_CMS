<template>
  <div class="top-nav">
    <div class="logo">
      <div>O</div>
      <div class="text">Clinic</div>
    </div>
    <div class="form-group">
      <div class="input-group">
        <span class="input-group-text" id="basic-addon1">
          <i class="fas fa-search"></i>
        </span>
        <input
          type="text"
          class="form-control"
          placeholder="Search..."
          aria-label="Search"
          aria-describedby="basic-addon1"
        />
      </div>
    </div>
    <div class="right-items">
      <div>
        <i class="fa-regular fa-bell"></i>
      </div>
      <div>
        <i class="fa-solid fa-user"></i>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "topNav",
  mounted() {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "/css/nav.css";
    document.head.appendChild(link);
  },
};
</script>
