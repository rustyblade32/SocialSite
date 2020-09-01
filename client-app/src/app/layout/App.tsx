import React, { useState, useEffect, Fragment, SyntheticEvent } from 'react';
import axios from 'axios'
import { Container } from 'semantic-ui-react'
import { IActivity } from "../models/activity";
import NavBar from '../../features/nav/NavBar';
import ActivityDashboard from '../../features/Activities/Dashboard/ActivityDashboard';
import agent from '../API/agent';
import LoadingComponent from './LoadingComponent';


const App = () => {
  const [activities, setActivities] = useState<IActivity[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<IActivity | null>(null);
  const [editmode, setEditMode] = useState(false);

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [target, setTarget] = useState("");

  const createActivityFormHandler = () => {
    setSelectedActivity(null);
    setEditMode(true);
  }

  const createActivityHandler = (activity: IActivity) => {
    setSubmitting(true);
    agent.Activities.create(activity).then(() => {
      setActivities([...activities, activity]);
      setSelectedActivity(activity);
      setEditMode(false);
    }).then(() => setSubmitting(false));
  }

  const editActivityHandler = (activity: IActivity) => {
    setSubmitting(true);
    agent.Activities.update(activity).then(() => {
      setActivities([...activities.filter(x => x.id !== activity.id), activity]);
      setSelectedActivity(activity);
      setEditMode(false);
    }).then(() => setSubmitting(false));
  }

  const deleteActivityHandler = (event:SyntheticEvent<HTMLButtonElement>, id: string) => {
    setSubmitting(true);
    setTarget(event.currentTarget.name);
    agent.Activities.delete(id).then(() => {
      setActivities([...activities.filter(x => x.id !== id)]);
    }).then(() => setSubmitting(false));
  }

  const selectActivityHandler = (id: string) => {
    agent.Activities.details(id).then(() => {
      setSelectedActivity(activities.filter(x => x.id === id)[0]);
      setEditMode(false);
    });
  }

  useEffect(() => {
    agent.Activities.list()
      .then((response) => {
        let activities: IActivity[] = [];
        response.forEach(activity => {
          activity.date = activity.date.split('.')[0];
          activities.push(activity);
        });
        setActivities(activities);
      }).then(() => setLoading(false))
  }, [])

  if (loading) {
    return <LoadingComponent content="Loading Activities..." />
  }

  return (
    <Fragment>
      <NavBar createActivityFormHandler={createActivityFormHandler} />
      <Container style={{ marginTop: "7em" }}>
        <ActivityDashboard
          activities={activities}
          selectActivity={selectActivityHandler}
          submitting = {submitting}
          selectedActivity={selectedActivity}
          setSelectedActivity={setSelectedActivity}
          editMode={editmode}
          setEditMode={setEditMode}
          createActivityHandler={createActivityHandler}
          editActivityHandler={editActivityHandler}
          deleteActivityHandler={deleteActivityHandler}
          target={target} />
      </Container>
    </Fragment>
  );

}

export default App;
