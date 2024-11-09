<template>
    <div class="d-flex">
        <!-- Sidebar Component -->
        <adminSidebar />

        <!-- Main Content for Managing Doctors -->
        <div class="manage-doctor-container ms-3 flex-grow-1">
            <div class="header mt-4 d-flex justify-content-between align-items-center">
                <h2>Manage Doctors</h2>
                <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#createDoctorModal">Add New Doctor</button>
            </div>

            <!-- Search Section -->
            <div class="filters mt-3 d-flex align-items-center">
                <input type="text" v-model="searchQuery" placeholder="Search Doctors" class="form-control me-2" />
            </div>

            <!-- Doctor List Table -->
            <div class="table-responsive mt-3">
                <table class="table table-striped table-bordered">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Specialization</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="doctor in filteredDoctors" :key="doctor.id">
                            <td>{{ doctor.name }}</td>
                            <td>{{ doctor.specialization }}</td>
                            <td>{{ doctor.status }}</td>
                            <td>
                                <button @click="viewDoctor(doctor.id)" class="btn btn-info btn-sm me-1">View</button>
                                <button @click="editDoctor(doctor.id)" class="btn btn-warning btn-sm me-1">Edit</button>
                                <button @click="deleteDoctor(doctor.id)" class="btn btn-danger btn-sm">Delete</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <!-- Create New Doctor Modal -->
            <div class="modal fade" id="createDoctorModal" tabindex="-1" aria-labelledby="createDoctorModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="createDoctorModalLabel">Add New Doctor</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <form @submit.prevent="submitNewDoctor">
                                <div class="mb-3">
                                    <label for="doctorName" class="form-label">Full Name</label>
                                    <input v-model="newDoctor.name" id="doctorName" type="text" class="form-control" placeholder="Full Name" required />
                                </div>
                                <div class="mb-3">
                                    <label for="doctorSpecialization" class="form-label">Specialization</label>
                                    <input v-model="newDoctor.specialization" id="doctorSpecialization" type="text" class="form-control" placeholder="Specialization" required />
                                </div>
                                <div class="mb-3">
                                    <label for="contactInfo" class="form-label">Contact Info</label>
                                    <input v-model="newDoctor.contactInfo" id="contactInfo" type="text" class="form-control" placeholder="Contact Info" required />
                                </div>
                                <div class="mb-3">
                                    <label for="workSchedule" class="form-label">Work Schedule</label>
                                    <input v-model="newDoctor.schedule" id="workSchedule" type="text" class="form-control" placeholder="Work Schedule" required />
                                </div>
                                <button type="submit" class="btn btn-primary">Submit</button>
                            </form>
                        </div>
                    </div>
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
            doctorList: [],
            newDoctor: {
                name: '',
                specialization: '',
                contactInfo: '',
                schedule: ''
            },
            searchQuery: ''
        };
    },
    computed: {
        filteredDoctors() {
            return this.doctorList.filter(doctor => 
                this.searchQuery ? doctor.name.toLowerCase().includes(this.searchQuery.toLowerCase()) : true
            );
        }
    },
    methods: {
        submitNewDoctor() {
            this.doctorList.push({ ...this.newDoctor, id: Date.now(), status: 'Active' });
            this.newDoctor = { name: '', specialization: '', contactInfo: '', schedule: '' };
            const modal = document.getElementById('createDoctorModal');
            const modalInstance = bootstrap.Modal.getInstance(modal);
            modalInstance.hide();  // Hide modal after form submission
        },
        viewDoctor(id) {
            // Handle doctor profile viewing
        },
        editDoctor(id) {
            // Handle doctor editing
        },
        deleteDoctor(id) {
            const index = this.doctorList.findIndex(doctor => doctor.id === id);
            if (index !== -1) {
                this.doctorList.splice(index, 1);
            }
        }
    }
};
</script>

<style scoped>
.manage-doctor-container {
    padding: 20px;
}
.table-responsive {
    margin-top: 20px;
}
.filters {
    margin-bottom: 20px;
}
button {
    margin: 0 5px;
}
</style>
