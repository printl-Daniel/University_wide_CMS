<template>
  <div class="top-nav">
    <div class="logo">
      <div class="img-logo">
        <img src="/img/images/logo.png" alt="" />
      </div>
      <div>
        <div class="text">Clinic - Appointment</div>
      </div>
    </div>
  </div>
</template>
<script></script>

<style>
.img-logo img {
  max-width: 5vw;
}
.top-nav {
  font-family: "Poppins", serif;
  font-weight: 400;
  font-style: normal;
  height: 10vh;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
}

.top-nav .logo {
  display: flex;
  gap: 1vw;
  justify-content: center;
  align-items: center;
}

.top-nav .logo .text {
  font-weight: 500;
  font-size: large;
}
.top-nav .logo i {
  color: green;
  font-size: 1.9vw;
}

@media (max-width: 768px) {
  * {
    margin: 0;
  }
}
</style>
