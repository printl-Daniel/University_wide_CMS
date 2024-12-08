<template>
  <div class="top-nav">
    <div class="logo">
      <img src="/img/icons/logo.png" alt="Clinic Logo" class="logo-img" />
      <div class="text">Clinic</div>
    </div>
    <!-- <div class="form-group">
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
    </div> -->
    <div class="right-items">
      <div>
        <i class="fa-regular fa-bell"></i>
      </div>
      <div>
        <i class="fa-solid fa-user"></i>
      </div>
      <button class="Btn">
        
        <div class="sign"><svg viewBox="0 0 512 512"><path d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z"></path></svg></div>
        
        <div class="text">Logout</div>
</button>



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

<style scoped>
.logo-img {
  max-height: 40px; /* Adjust based on your design */
  object-fit: contain;
}</style>