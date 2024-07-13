function allocateRooms(groupData, hostelData) {
    groupData = groupData.map(group => ({
        'Group ID': parseInt(group['Group ID']),
        Members: parseInt(group.Members),
        Gender: group.Gender
    })).sort((a, b) => a['Group ID'] - b['Group ID']);

    hostelData = hostelData.map(room => ({
        'Hostel Name': room['Hostel Name'],
        'Room Number': room['Room Number'],
        Capacity: parseInt(room.Capacity),
        Gender: room.Gender,
        AvailableCapacity: parseInt(room.Capacity)
    }));

    const allocation = [];

    for (const group of groupData) {
        const [boys, girls] = parseGender(group.Gender, group.Members);

        if (boys > 0) {
            allocateGroup(group, hostelData, allocation, 'Boys', boys);
        }

        if (girls > 0) {
            allocateGroup(group, hostelData, allocation, 'Girls', girls);
        }
    }

    return allocation;
}

function parseGender(genderString, totalMembers) {
    if (genderString.includes('&')) {
        const [boysStr, girlsStr] = genderString.split('&');
        const boys = parseInt(boysStr.trim().split(' ')[0]);
        const girls = parseInt(girlsStr.trim().split(' ')[0]);
        return [boys, girls];
    } else if (genderString === 'Boys') {
        return [parseInt(totalMembers), 0];
    } else if (genderString === 'Girls') {
        return [0, parseInt(totalMembers)];
    }
    return [0, 0]; // Default case, should not happen
}

function allocateGroup(group, hostelData, allocation, gender, membersToAllocate) {
    // Sort rooms by capacity in descending order to allocate larger rooms first
    const genderRooms = hostelData.filter(room => 
        room.Gender === gender && room.AvailableCapacity >= membersToAllocate
    ).sort((a, b) => b.Capacity - a.Capacity);

    if (genderRooms.length > 0) {
        const room = genderRooms[0];

        allocation.push({
            'Group ID': group['Group ID'],
            'Hostel Name': room['Hostel Name'],
            'Room Number': room['Room Number'],
            'Members Allocated': membersToAllocate
        });

        room.AvailableCapacity -= membersToAllocate;
    }
}


function alls(groupData, hostelData) {
    groupData = groupData.map(group => ({
        'Group ID': parseInt(group['Group ID']),
        Members: parseInt(group.Members),
        Gender: group.Gender
    })).sort((a, b) => a['Group ID'] - b['Group ID']);

    hostelData = hostelData.map(room => ({
        'Hostel Name': room['Hostel Name'],
        'Room Number': room['Room Number'],
        Capacity: parseInt(room.Capacity),
        Gender: room.Gender,
        AvailableCapacity: parseInt(room.Capacity)
    }));

    const allocation = [];

    for (const group of groupData) {
        const [boys, girls] = parseGender(group.Gender, group.Members);

        if (group['Group ID'] === 104 && girls > 0) {
            const room = hostelData.find(room => 
                room.Gender === 'Girls' && room.AvailableCapacity >= girls
            );

            if (room) {
                allocation.push({
                    'Group ID': group['Group ID'],
                    'Hostel Name': room['Hostel Name'],
                    'Room Number': room['Room Number'],
                    'Members Allocated': girls
                });
                room.AvailableCapacity -= girls;
            }

            break; // Exit after finding the desired allocation
        }
    }

    return allocation;
}

function pG(genderString, totalMembers) {
    if (genderString.includes('&')) {
        const [boysStr, girlsStr] = genderString.split('&');
        const boys = parseInt(boysStr.trim().split(' ')[0]);
        const girls = parseInt(girlsStr.trim().split(' ')[0]);
        return [boys, girls];
    } else if (genderString === 'Boys') {
        return [parseInt(totalMembers), 0];
    } else if (genderString === 'Girls') {
        return [0, parseInt(totalMembers)];
    }
    return [0, 0]; // Default case, should not happen
}

