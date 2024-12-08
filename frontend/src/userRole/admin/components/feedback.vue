<template>
  <div class="feedback-dashboard">
    <div class="dashboard-content">
      <div class="chart-section">
        <div class="chart-container">
          <canvas ref="chartRef"></canvas>
        </div>
        <div class="summary-stats">
          <div class="stat-item positive">
            <span class="stat-value">{{ positiveFeedbacks }}</span>
            <span class="stat-label">Positive</span>
          </div>
          <div class="stat-item neutral">
            <span class="stat-value">{{ neutralFeedbacks }}</span>
            <span class="stat-label">Neutral</span>
          </div>
          <div class="stat-item negative">
            <span class="stat-value">{{ negativeFeedbacks }}</span>
            <span class="stat-label">Negative</span>
          </div>
        </div>
      </div>
      <div class="feedback-section">
        <div class="filter-container">
          <button
            v-for="filter in filters"
            :key="filter"
            @click="setActiveFilter(filter)"
            :class="['filter-button', { active: activeFilter === filter }]"
          >
            {{ filter }}
          </button>
        </div>
        <div class="feedback-list">
          <div
            v-for="item in filteredFeedbackItems"
            :key="item.email"
            class="feedback-item"
            :class="item.value.toLowerCase()"
          >
            <div class="feedback-header">
              <h3>{{ item.name }}</h3>
              <span class="date">{{ formatDate(item.submittedAt) }}</span>
            </div>
            <p class="email">{{ item.email }}</p>
            <p class="feedback-content">{{ item.feedback }}</p>
            <div class="sentiment-info">
              <span class="sentiment-tag" :class="item.value.toLowerCase()">{{
                item.value
              }}</span>
              <span class="sentiment-details">{{
                formatSentiment(item.sentiment)
              }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, computed, watch } from "vue";
import Chart from "chart.js/auto";
import { getFeedbacks, syncFeedback } from "../services/feedbackService";

export default {
  setup() {
    const chartRef = ref(null);
    const chartInstance = ref(null);
    const activeFilter = ref("All");
    const filters = ["All", "Positive", "Neutral", "Negative"];

    const feedbackItems = ref([]);

    const fetchFeedbacks = async () => {
      try {
        const feedbacks = await getFeedbacks();
        feedbackItems.value = feedbacks;
        updateChart();
      } catch (error) {
        console.error("Failed to load feedbacks:", error);
        alert("Unable to fetch feedbacks. Please try again later.");
      }
    };

    const syncFeedbackItems = async () => {
      try {
        await syncFeedback();
      } catch (error) {
        console.error("Failed to sync feedback:", error);
        alert("Failed to sync feedback. Please try again later.");
      }
    };

    const filteredFeedbackItems = computed(() => {
      if (activeFilter.value === "All") {
        return feedbackItems.value;
      }
      return feedbackItems.value.filter(
        (item) => item.value.toLowerCase() === activeFilter.value.toLowerCase()
      );
    });

    const formatDate = (date) => {
      const d = new Date(date._seconds * 1000);
      return new Intl.DateTimeFormat("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }).format(d);
    };

    const formatSentiment = (sentiment) => {
      const match = sentiment.match(/intensity of (\d+\.\d+)/);
      if (match) {
        const intensity = parseFloat(match[1]);
        return `Intensity: ${(intensity * 100).toFixed(2)}%`;
      }
      return sentiment;
    };

    const setActiveFilter = (filter) => {
      activeFilter.value = filter;
    };

    const getSentimentCounts = () => {
      const counts = { Positive: 0, Neutral: 0, Negative: 0 };
      feedbackItems.value.forEach((item) => {
        const sentimentKey =
          item.value.charAt(0).toUpperCase() + item.value.slice(1);
        if (counts[sentimentKey] !== undefined) {
          counts[sentimentKey]++;
        }
      });
      return [counts.Positive, counts.Neutral, counts.Negative];
    };

    const positiveFeedbacks = computed(() => getSentimentCounts()[0]);
    const neutralFeedbacks = computed(() => getSentimentCounts()[1]);
    const negativeFeedbacks = computed(() => getSentimentCounts()[2]);

    const initializeChart = () => {
      const ctx = chartRef.value.getContext("2d");
      chartInstance.value = new Chart(ctx, {
        type: "doughnut",
        data: {
          labels: ["Positive", "Neutral", "Negative"],
          datasets: [
            {
              data: getSentimentCounts(),
              backgroundColor: [
                "rgba(75, 192, 192, 0.8)",
                "rgba(54, 162, 235, 0.8)",
                "rgba(255, 99, 132, 0.8)",
              ],
              borderColor: [
                "rgba(75, 192, 192, 1)",
                "rgba(54, 162, 235, 1)",
                "rgba(255, 99, 132, 1)",
              ],
              borderWidth: 1,
            },
          ],
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              position: "bottom",
            },
            title: {
              display: false,
              text: "Feedback Insights",
            },
          },
        },
      });
    };

    const updateChart = () => {
      if (chartInstance.value) {
        chartInstance.value.data.datasets[0].data = getSentimentCounts();
        chartInstance.value.update();
      }
    };

    onMounted(async () => {
      await fetchFeedbacks();
      initializeChart();
      await syncFeedbackItems();
    });

    watch(feedbackItems, updateChart, { deep: true });

    return {
      chartRef,
      activeFilter,
      filters,
      feedbackItems,
      filteredFeedbackItems,
      formatDate,
      formatSentiment,
      setActiveFilter,
      positiveFeedbacks,
      neutralFeedbacks,
      negativeFeedbacks,
    };
  },
};
</script>

<style scoped>
.feedback-dashboard {
  max-width: 1200px;
  height: 95%;
  margin: 0 auto;
  padding: 2rem;
  background-color: #f8f9fa;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.dashboard-content {
  display: flex;
  gap: 2rem;
}

.chart-section {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.chart-container {
  display: flex;
  width: 70%;
  background-color: white;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.summary-stats {
  width: 70%;
  display: flex;
  justify-content: space-between;
  gap: 1rem;
}

.stat-item {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem;
  background-color: white;
  border-radius: 8px;

  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.stat-value {
  font-size: 2rem;
  font-weight: bold;
}

.stat-label {
  font-size: 0.8rem;
  color: #7f8c8d;
}

.stat-item.positive {
  color: rgb(75, 192, 192);
}
.stat-item.neutral {
  color: rgb(54, 162, 235);
}
.stat-item.negative {
  color: rgb(255, 99, 132);
}

.feedback-section {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.filter-container {
  display: flex;
  justify-content: center;
  gap: 1rem;
}

.filter-button {
  padding: 0.5rem 1rem;
  border: none;
  background-color: #e0e0e0;
  color: #333;
  border-radius: 20px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 0.8rem;
}

.filter-button:hover {
  background-color: #d0d0d0;
}

.filter-button.active {
  background-color: #4cca67;
  color: white;
}

.feedback-list {
  overflow-y: auto;
  display: grid;
  gap: 1rem;
  max-height: 70vh;
}

.feedback-item {
  background-color: white;
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  border-left: 5px solid transparent;
}

.feedback-item:hover {
  transform: translateY(-5px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.feedback-item.positive {
  border-left-color: rgb(75, 192, 192);
}
.feedback-item.neutral {
  border-left-color: rgb(54, 162, 235);
}
.feedback-item.negative {
  border-left-color: rgb(255, 99, 132);
}

.feedback-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
}

.feedback-header h3 {
  margin: 0;
  font-size: 1.2rem;
  color: #2c3e50;
}

.date {
  font-size: 0.9rem;
  color: #7f8c8d;
}

.email {
  font-size: 0.9rem;
  color: #3498db;
  margin-bottom: 0.5rem;
}

.feedback-content {
  color: #34495e;
  line-height: 1.6;
  margin-bottom: 1rem;
}

.sentiment-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.sentiment-tag {
  padding: 2px 8px;
  border-radius: 12px;
  font-size: 0.8rem;
  font-weight: bold;
}

.sentiment-tag.positive {
  background-color: rgba(75, 192, 192, 0.2);
  color: rgb(75, 192, 192);
}

.sentiment-tag.neutral {
  background-color: rgba(54, 162, 235, 0.2);
  color: rgb(54, 162, 235);
}

.sentiment-tag.negative {
  background-color: rgba(255, 99, 132, 0.2);
  color: rgb(255, 99, 132);
}

.sentiment-details {
  font-size: 0.9rem;
  color: #7f8c8d;
}

@media (max-width: 1024px) {
  .dashboard-content {
    flex-direction: column;
  }
}

@media (max-width: 768px) {
  .feedback-dashboard {
    padding: 1rem;
  }

  .dashboard-title {
    font-size: 2rem;
  }

  .summary-stats {
    flex-wrap: wrap;
  }

  .stat-item {
    flex-basis: calc(50% - 0.5rem);
  }

  .filter-container {
    flex-wrap: wrap;
  }

  .filter-button {
    flex-grow: 1;
  }
}

@media (max-width: 480px) {
  .stat-item {
    flex-basis: 100%;
  }

  .feedback-item {
    padding: 1rem;
  }

  .feedback-header h3 {
    font-size: 1rem;
  }

  .date,
  .email,
  .sentiment-details {
    font-size: 0.8rem;
  }

  .feedback-content {
    font-size: 0.9rem;
  }
}
</style>
