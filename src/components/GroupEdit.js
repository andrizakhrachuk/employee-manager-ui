import React, {useEffect, useState} from "react";
import {Button, Container, Form, FormGroup, Input, Label} from "reactstrap";
import {Link, useParams} from "react-router-dom";

const GroupEdit = (props) => {
    let {id} = useParams();

    const [groupId, setGroupId] = useState('');
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [country, setCountry] = useState('');
    const [postalCode, setPostalCode] = useState('');

    const nameChangeHandler = (event) => {
        setName(event.target.value);
    };
    const addressChangeHandler = (event) => {
        setAddress(event.target.value);
    };
    const cityChangeHandler = (event) => {
        setCity(event.target.value);
    };
    const countryChangeHandler = (event) => {
        setCountry(event.target.value);
    };
    const postalCodeChangeHandler = (event) => {
        setPostalCode(event.target.value);
    };

    useEffect(() => {
        if (id !== 'new') {
            fetch(`/api/groups/${id}`)
                .then(response => {
                    if (response.ok) {
                        return response.json();
                    }
                    throw response;
                })
                .then(it => {
                    setGroupId(it.id);
                    setName(it.name);
                    setAddress(it.address);
                    setCity(it.city);
                    setCountry(it.country);
                    setPostalCode(it.postalCode);
                })
                .catch(error => console.error("Error fetching data: ", error));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const submitHandler = (event) => {
        event.preventDefault();
        const group = {
            id: groupId,
            name: name,
            address: address,
            city: city,
            country: country,
            postalCode: postalCode
        }

        fetch('/api/groups' + (groupId ? '/' + groupId : ''), {
            method: (groupId) ? 'PUT' : 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(group)
        })
            .then(() => props.history.push('/groups'))
            .catch(error => console.error("Error fetching data: ", error));

    }

    return (
        <Container>
            <h2>{groupId ? 'Edit Group' : 'Add Group'}</h2>
            <Form onSubmit={submitHandler}>
                <FormGroup>
                    <Label for="name">Name</Label>
                    <Input type="text" name="name" id="name" value={name} onChange={nameChangeHandler}/>
                </FormGroup>
                <FormGroup>
                    <Label for="address">Address</Label>
                    <Input type="text" name="address" id="address" value={address} onChange={addressChangeHandler}/>
                </FormGroup>
                <FormGroup>
                    <Label for="city">City</Label>
                    <Input type="text" name="city" id="city" value={city} onChange={cityChangeHandler}/>
                </FormGroup>
                <div className="row">
                    <FormGroup className="col-md-5 mb-3">
                        <Label for="country">Country</Label>
                        <Input type="text" name="country" id="country" value={country} onChange={countryChangeHandler}/>
                    </FormGroup>
                    <FormGroup className="col-md-3 mb-3">
                        <Label for="country">Postal Code</Label>
                        <Input type="text" name="postalCode" id="postalCode" value={postalCode}
                               onChange={postalCodeChangeHandler}/>
                    </FormGroup>
                </div>
                <FormGroup>
                    <Button color="primary" type="submit">Save</Button>{' '}
                    <Button color="secondary" tag={Link} to="/groups">Cancel</Button>
                </FormGroup>
            </Form>
        </Container>
    );
};

export default GroupEdit;