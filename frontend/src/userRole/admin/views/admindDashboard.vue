<template>
  <div>
    <!-- Admin Navbar (top navbar) -->
    <div class="header">
      <topNav />
    </div>

    <div class="page-content d-flex">
      <div class="sidebar">
        <sideNav />
      </div>

      <div class="content flex-grow-1">
        <h2>Dashboard</h2>
        <div class="row g-4 mt-3">
          <!-- Inventory Card -->
          <div class="col-md-4">
            <div class="card text-center">
              <div class="card-body">
                <h3 class="card-title">Inventory</h3>
                <p class="card-text">100 Items Available</p>
              </div>
            </div>
          </div>

          <!-- Active Users Card -->
          <div class="col-md-4">
            <div class="card text-center">
              <div class="card-body">
                <h3 class="card-title">Active Users</h3>
                <p class="card-text">100 Registered</p>
              </div>
            </div>
          </div>

          <!-- Feedback Card -->
          <div class="col-md-4">
            <div class="card text-center">
              <div class="card-body">
                <h3 class="card-title">Feedbacks</h3>
                <p class="card-text">120 Feedbacks Received</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Sentiment Analysis Chart -->
        <div class="row g-4 mt-4">
          <div class="col-md-12">
            <div class="card">
              <div class="card-body">
                <h3 class="card-title text-center">Feedback Sentiment Over Time</h3>
                <canvas id="feedbackSentimentChart" width="400" height="200"></canvas>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Chart from 'chart.js/auto';
import sideNav from '../components/sideNav.vue';
import topNav from '../components/topNav.vue';

export default {
  components: {
    sideNav,
    topNav
  },
  mounted() {
    // Initialize the sentiment analysis chart using Chart.js
    const ctx = document.getElementById('feedbackSentimentChart').getContext('2d');
    new Chart(ctx, {
      type: 'bar', // Change chart type to 'bar'
      data: {
        labels: ['January', 'February', 'March', 'April', 'May'], // X-axis labels (Months)
        datasets: [
          {
            label: 'Positive Sentiment',
            data: [80, 85, 75, 90, 88], // Data for positive sentiment percentages
            backgroundColor: 'rgba(75, 192, 192, 0.6)', // Bar color for positive feedback
            borderColor: 'rgba(75, 192, 192, 1)', // Border color for positive feedback
            borderWidth: 1
          },
          {
            label: 'Neutral Sentiment',
            data: [50, 40, 37, 50, 45], // Data for neutral sentiment percentages
            backgroundColor: 'rgba(255, 159, 64, 0.6)', // Bar color for neutral feedback
            borderColor: 'rgba(255, 159, 64, 1)', // Border color for neutral feedback
            borderWidth: 1
          },
          {
            label: 'Negative Sentiment',
            data: [10, 7, 13, 4, 5], // Data for negative sentiment percentages
            backgroundColor: 'rgba(255, 99, 132, 0.6)', // Bar color for negative feedback
            borderColor: 'rgba(255, 99, 132, 1)', // Border color for negative feedback
            borderWidth: 1
          }
        ]
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true, // Ensure the Y-axis starts from zero
            title: {
              display: true,
              text: 'Sentiment Percentage'
            }
          },
          x: {
            title: {
              display: true,
              text: 'Month'
            }
          }
        }
      }
    });
  }
}
</script>

<style scoped>

.card {
  margin-bottom: 15px;
}

.card-body {
  padding: 15px;
}

.card-title {
  font-size: 1.5rem;
  font-weight: bold;
}

.card-text {
  font-size: 1.2rem;
}

/* For responsive layout */
@media (max-width: 768px) {
  .sidebar {
    width: 100%;
    margin-bottom: 15px;
  }
}
</style>
