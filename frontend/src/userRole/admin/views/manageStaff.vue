<template>
    <div class="d-flex">
        <!-- Sidebar Component -->
        <adminSidebar />

        <!-- Main Content for Managing Staff -->
        <div class="manage-staff-container ms-3 flex-grow-1">
            <div class="header mt-4 d-flex justify-content-between align-items-center">
                <h2>Manage Clinic Staff</h2>
                <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#createStaffModal">Create New Staff</button>
            </div>
        
            <!-- Search and Filter Section -->
            <div class="filters mt-3 d-flex align-items-center">
                <input type="text" v-model="searchQuery" placeholder="Search Staff" class="form-control me-2" />
                <select v-model="roleFilter" class="form-select w-auto">
                    <option value="">Filter by Role</option>
                    <option value="nurse">Nurse</option>
                    <option value="admin">Admin Staff</option>
                    <option value="support">Support Staff</option>
                </select>
            </div>
        
            <!-- Staff List Table -->
            <div class="table-responsive mt-3">
                <table class="table table-striped table-bordered">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Role</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="staff in filteredStaff" :key="staff.id">
                            <td>{{ staff.name }}</td>
                            <td>{{ staff.role }}</td>
                            <td>{{ staff.status }}</td>
                            <td>
                                <button @click="viewStaff(staff.id)" class="btn btn-info btn-sm me-1">View</button>
                                <button @click="editStaff(staff.id)" class="btn btn-warning btn-sm me-1">Edit</button>
                                <button @click="deleteStaff(staff.id)" class="btn btn-danger btn-sm">Delete</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        
            <!-- Create New Staff Modal -->
            <div class="modal fade" id="createStaffModal" tabindex="-1" aria-labelledby="createStaffModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="createStaffModalLabel">Create New Staff</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <form @submit.prevent="submitNewStaff">
                                <div class="mb-3">
                                    <label for="staffName" class="form-label">Full Name</label>
                                    <input v-model="newStaff.name" id="staffName" type="text" class="form-control" placeholder="Full Name" required />
                                </div>
                                <div class="mb-3">
                                    <label for="staffRole" class="form-label">Role</label>
                                    <select v-model="newStaff.role" id="staffRole" class="form-select" required>
                                        <option value="">Select Role</option>
                                        <option value="nurse">Nurse</option>
                                        <option value="admin">Admin Staff</option>
                                        <option value="support">Support Staff</option>
                                    </select>
                                </div>
                                <div class="mb-3">
                                    <label for="contactInfo" class="form-label">Contact Info</label>
                                    <input v-model="newStaff.contactInfo" id="contactInfo" type="text" class="form-control" placeholder="Contact Info" required />
                                </div>
                                <div class="mb-3">
                                    <label for="workSchedule" class="form-label">Work Schedule</label>
                                    <input v-model="newStaff.schedule" id="workSchedule" type="text" class="form-control" placeholder="Work Schedule" required />
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
            staffList: [],
            newStaff: {
                name: '',
                role: '',
                contactInfo: '',
                schedule: ''
            },
            searchQuery: '',
            roleFilter: ''
        };
    },
    computed: {
        filteredStaff() {
            return this.staffList.filter(staff => {
                return (
                    (this.searchQuery ? staff.name.toLowerCase().includes(this.searchQuery.toLowerCase()) : true) &&
                    (this.roleFilter ? staff.role === this.roleFilter : true)
                );
            });
        }
    },
    methods: {
        submitNewStaff() {
            this.staffList.push({ ...this.newStaff, id: Date.now(), status: 'Active' });
            this.newStaff = { name: '', role: '', contactInfo: '', schedule: '' };
            const modal = document.getElementById('createStaffModal');
            const modalInstance = bootstrap.Modal.getInstance(modal);
            modalInstance.hide();  // Hide modal after form submission
        },
        viewStaff(id) {
            // Handle staff profile viewing
        },
        editStaff(id) {
            // Handle staff editing
        },
        deleteStaff(id) {
            const index = this.staffList.findIndex(staff => staff.id === id);
            if (index !== -1) {
                this.staffList.splice(index, 1);
            }
        }
    }
};
</script>

<style scoped>
.manage-staff-container {
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
header {
    display: flex;
    justify-content: space-between;
    align-items: center;
}
</style>
