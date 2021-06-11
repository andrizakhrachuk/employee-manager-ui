import React, {useEffect, useState} from 'react';
import {Button, ButtonGroup, Container, Table} from "reactstrap";
import {Link} from 'react-router-dom';

const GroupList = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [groups, setGroups] = useState([]);

    useEffect(() => {
        fetch("/api/groups")
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
                throw response;
            })
            .then(data => setGroups(data))
            .catch(error => console.error("Error fetching data: ", error))
            .finally(() => setIsLoading(false))
    }, []);

    const removeGroupHandler = (id) => {
        fetch(`/api/groups/${id}`, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
            .then(() => {
                let updatedGroups = groups.filter(it => it.id !== id);
                setGroups(updatedGroups);
            })
    }

    const groupList = groups.map(group => {
        const address = `${group.address || ''} ${group.city || ''}`;

        return (
            <tr key={group.id}>
                <td style={{whiteSpace: 'nowrap'}}>{group.name}</td>
                <td>{address}</td>
                <td>{group.events.map(event => {
                    return <div key={event.id}>{new Intl.DateTimeFormat('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: '2-digit'
                    }).format(new Date(event.date))}: {event.title}</div>
                })}</td>
                <td>
                    <ButtonGroup>
                        <Button size="sm" color="primary" tag={Link} to={"/groups/" + group.id}>Edit</Button>
                        <Button size="sm" color="danger" onClick={() => removeGroupHandler(group.id)}>Delete</Button>
                    </ButtonGroup>
                </td>
            </tr>
        );
    });

    if (isLoading) {
        return "<p>Loading...</p>";
    }

    return (
        <Container fluid>
            <div className="float-right">
                <Button color="success" tag={Link} to="/groups/new">Add Group</Button>
            </div>
            <h3>My JUG Tour</h3>
            <Table className="mt-4">
                <thead>
                <tr>
                    <th width="20%">Name</th>
                    <th width="20%">Location</th>
                    <th>Events</th>
                    <th width="10%">Actions</th>
                </tr>
                </thead>
                <tbody>{groupList}</tbody>
            </Table>
        </Container>
    );
};

export default GroupList;