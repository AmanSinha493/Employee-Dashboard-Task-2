document.addEventListener("DOMContentLoaded", function () {
    populateRoles();
    disableFilterButton();
    let input = document.querySelectorAll('.filter-options-container input');
    for (let i = 0; i < input.length; i++) {
        select = input[i].parentNode;
        select.addEventListener('click', selectFilter)
    }
});

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
function applyRoleFilter() {
    let roles= JSON.parse(sessionStorage.getItem('rolesDetail'))||[];
    let location, department;
    let filteredRoles= [];
    for (let i = 0; i < roles.length; i++) {
        location = checkLocationFilter(roles[i][1].employees[0].location);
        department = checkDepartmentFilter(roles[i][1].employees[0].dept);
        if (location && department) {
            filteredRoles.push(roles[i]);
        }
    }
    unpoplateRoles();
    populateFilteredRoles(filteredRoles);
}
function applyRoleReset() {
    let input = document.querySelectorAll('.filter-options-container input');
    input.forEach((element) => { element.checked = false });
    document.querySelector("#department-filter .department-dropdown").classList.add('hide');
    document.querySelector("#location-filter .location-dropdown").classList.add('hide');
    unpoplateRoles();
    populateRoles();
    checkdisableFilterButton();
}
