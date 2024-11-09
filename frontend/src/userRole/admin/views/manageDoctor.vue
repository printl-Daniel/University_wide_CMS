<template>
    <div class="d-flex">
        <!-- Sidebar -->
        <adminSidebar />

        <!-- Main Content -->
        <div class="container mt-4 flex-grow-1">
            <h2 class="mb-4">Manage Doctors</h2>
            <div class="card">
                <div class="card-header">
                    <button class="btn btn-primary" @click="addDoctor">Add Doctor</button>
                </div>
                <div class="card-body">
                    <table class="table table-striped">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Phone</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(doctor, index) in doctors" :key="doctor.id">
                                <td>{{ index + 1 }}</td>
                                <td>{{ doctor.name }}</td>
                                <td>{{ doctor.email }}</td>
                                <td>{{ doctor.phone }}</td>
                                <td>
                                    <button class="btn btn-warning btn-sm" @click="editDoctor(doctor.id)">Edit</button>
                                    <button class="btn btn-danger btn-sm" @click="deleteDoctor(doctor.id)">Delete</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import adminSidebar from '../components/admin-sideBar.vue';

export default {
    components: {
        adminSidebar
    },
    data() {
        return {
            doctors: [
                { id: 1, name: "Dr. Alice Johnson", email: "alice@example.com", phone: "123-456-7890" },
                { id: 2, name: "Dr. Bob Smith", email: "bob@example.com", phone: "098-765-4321" },
                // Add more doctor data as needed
            ],
        };
    },
    methods: {
        addDoctor() {
            // Logic to add a doctor
        },
        editDoctor(id) {
            // Logic to edit a doctor
        },
        deleteDoctor(id) {
            // Logic to delete a doctor
            this.doctors = this.doctors.filter(doctor => doctor.id !== id);
        },
    },
};
</script>

<style scoped>
.container {
    max-width: 800px;
}
.d-flex {
    display: flex;
}
</style>
