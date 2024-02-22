document.addEventListener("DOMContentLoaded", function () {
    populateRoles();
    disableRoleFilterButton();
});

function applyLocationFilter(role)
{
    let roleLocation=role[1].employees[0].location;
    let selectedLocation=document.getElementsByClassName("location-filter")[0].value;
    if(selectedLocation=='')
        return true;
    return(roleLocation.toLowerCase()==selectedLocation.toLowerCase())
}
function applyDepartmentFilter(role)
{
    let selectedDepartment=document.getElementsByClassName("department-filter")[0].value;
    let roleDepartment=role[1].employees[0].dept;
    if(selectedDepartment=='')
        return true;
    return(roleDepartment.split(' ').join('').toLowerCase()==selectedDepartment.toLowerCase())
}

function applyRoleFilter(){
    let roles=rolesDetails();
    let location,department;
    let filteredRoles=[];
    for (let i = 0; i < roles.length; i++) {
        location=applyLocationFilter(roles[i]);
        department=applyDepartmentFilter(roles[i]);
        if (location && department) {
            filteredRoles.push(roles[i]);
        }
    }
    populateFilteredRoles(filteredRoles);
}

function applyRoleReset(){
    document.getElementsByClassName("location-filter")[0].value='';
    document.getElementsByClassName("department-filter")[0].value='';
    unpoplateRoles();
    populateRoles();
    checkDisableFilterButton();
}
function populateFilteredRoles(filteredRoles) {
    unpoplateRoles();
    sessionStorage.setItem('FilteredRolesDetail', JSON.stringify(filteredRoles));
    const roles = JSON.parse(sessionStorage.getItem('FilteredRolesDetail')) || [];
    if (roles && roles.length > 0) {
        roles.forEach(role => {
            createRoleBlock(role);
        });
    } else {
        console.log('No employee data available.');
    }
}

function disableRoleFilterButton() {
    let selects = document.querySelectorAll('.filter-options-container select');
    selects.forEach(select => {
        select.addEventListener('change', checkDisableFilterButton);
    });
}

function checkDisableFilterButton() {
    let selects = document.querySelectorAll('.filter-options-container select');
    let applyButton = document.querySelector('.apply-btn');
    let resetButton = document.querySelector('.reset-btn');
    let isEnabled = false;
    selects.forEach(select => {
        if (select.value !== '') {
            isEnabled = true;
        }
    });
    applyButton.classList.toggle('active', isEnabled);
    resetButton.classList.toggle('active',isEnabled);
}
