import React, { useState, useEffect, Fragment } from 'react';
import axios from 'axios'
import { Container } from 'semantic-ui-react'
import { IActivity } from "../models/activity";
import NavBar from '../../features/nav/NavBar';
import ActivityDashboard from '../../features/Activities/Dashboard/ActivityDashboard';


const App = () => {
  const [activities, setActivities] = useState<IActivity[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<IActivity | null>(null);
  const [editmode, setEditMode] = useState(false);

  const createActivityFormHandler = () => {
    setSelectedActivity(null);
    setEditMode(true);
  }

  const createActivityHandler = (activity: IActivity) => {
    setActivities([...activities, activity]);
    setSelectedActivity(activity);
    setEditMode(false);
  }

  const editActivityHandler = (activity: IActivity) => {
    setActivities([...activities.filter(x => x.id !== activity.id), activity]);
    setSelectedActivity(activity);
    setEditMode(false);
  }

  const deleteActivityHandler = (id: string) => {
    setActivities([...activities.filter(x => x.id !== id)]);
  }

  const selectActivityHandler = (id: string) => {
    setSelectedActivity(activities.filter(x => x.id === id)[0]);
    setEditMode(false);
  }

  useEffect(() => {
    axios.get<IActivity[]>('http://localhost:5000/api/activities')
      .then((response) => {
        let activities: IActivity[] = [];
        response.data.forEach(activity => {
          activity.date = activity.date.split('.')[0];
          activities.push(activity);
        });
        setActivities(activities);
      })
  }, [])

  return (
    <Fragment>
      <NavBar createActivityFormHandler={createActivityFormHandler} />
      <Container style={{ marginTop: "7em" }}>
        <ActivityDashboard
          activities={activities}
          selectActivity={selectActivityHandler}
          selectedActivity={selectedActivity}
          setSelectedActivity={setSelectedActivity}
          editMode={editmode}
          setEditMode={setEditMode}
          createActivityHandler={createActivityHandler}
          editActivityHandler={editActivityHandler}
          deleteActivityHandler={deleteActivityHandler} />
      </Container>
    </Fragment>
  );

}

export default App;
