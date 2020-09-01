import React, { useState, FormEvent } from 'react'
import { Segment, Form, Button } from 'semantic-ui-react'
import { IActivity } from '../../../app/models/activity'
import { v4 as uuid } from 'uuid'

interface IProps {
    setEditMode: (editMode: boolean) => void;
    activity: IActivity | null;
    createActivityHandler: (activity: IActivity) => void;
    editActivityHandler: (activity: IActivity) => void;
    submitting: boolean;
}

const ActivityForm: React.FC<IProps> = ({
    setEditMode,
    activity: initialActivity,
    createActivityHandler,
    editActivityHandler,
    submitting }) => {

    const initializeForm = () => {
        if (initialActivity)
            return initialActivity;
        else
            return {
                id: "",
                title: "",
                category: "",
                description: "",
                date: "",
                city: "",
                venue: ""
            };
    }

    const [activity, setActivity] = useState<IActivity>(initializeForm);

    const propertyChangeHandler = (event: FormEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        const { name, value } = event.currentTarget;
        setActivity({ ...activity, [name]: value });
    }

    const submitForm = () => {
        if (activity.id.length === 0) {
            let newActivity = {
                ...activity,
                id: uuid()
            };
            createActivityHandler(newActivity);
        }

        else
            editActivityHandler(activity);
    }

    return (
        <Segment clearing>
            <Form onSubmit={submitForm}>
                <Form.Input
                    onChange={propertyChangeHandler}
                    placeholder="Title"
                    name="title"
                    value={activity.title} />
                <Form.TextArea
                    onChange={propertyChangeHandler}
                    rows={2}
                    placeholder="Description"
                    name="description"
                    value={activity.description} />
                <Form.Input
                    onChange={propertyChangeHandler}
                    placeholder="Category"
                    name="category"
                    value={activity.category} />
                <Form.Input
                    onChange={propertyChangeHandler}
                    type="datetime-local"
                    placeholder="Date"
                    name="date"
                    value={activity.date} />
                <Form.Input
                    onChange={propertyChangeHandler}
                    placeholder="Venue"
                    name="venue"
                    value={activity.venue} />
                <Form.Input
                    onChange={propertyChangeHandler}
                    placeholder="City"
                    name="city"
                    value={activity.city} />
                <Button loading={submitting} floated="right" positive type="submit" content="Save" />
                <Button onClick={() => setEditMode(false)} floated="right" basic content="Cancel" />
            </Form>
        </Segment>
    )
}

export default ActivityForm
