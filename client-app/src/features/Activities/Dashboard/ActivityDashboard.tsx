import React from 'react'
import { Grid } from 'semantic-ui-react'
import { IActivity } from '../../../app/models/activity';
import ActivityList from './ActivityList';
import ActivityDetails from '../Details/ActivityDetails';
import ActivityForm from '../Form/ActivityForm';

interface IProps {
    activities: IActivity[];
    selectActivity: (id: string) => void;
    selectedActivity: IActivity | null;
    editMode: boolean;
    setEditMode: (editMode: boolean) => void;
    setSelectedActivity: (activity: IActivity | null) => void;
    createActivityHandler: (activity: IActivity) => void;
    editActivityHandler: (activity: IActivity) => void;
    deleteActivityHandler: (id: string) => void;
}

const ActivityDashboard: React.FC<IProps> =
    ({ activities,
        selectActivity,
        selectedActivity,
        setSelectedActivity,
        editMode,
        setEditMode,
        createActivityHandler,
        editActivityHandler,
        deleteActivityHandler }) => {
        return (
            <Grid>
                <Grid.Column width={10}>
                    <ActivityList
                        activities={activities}
                        selectActivity={selectActivity}
                        deleteActivityHandler={deleteActivityHandler} />
                </Grid.Column>

                <Grid.Column width={6}>
                    {selectedActivity
                        && !editMode
                        && <ActivityDetails
                            selectedActivity={selectedActivity}
                            setSelectedActivity={setSelectedActivity}
                            setEditMode={setEditMode} />}
                    {editMode && <ActivityForm
                        key = {(selectedActivity && selectedActivity.id) || 0}
                        createActivityHandler={createActivityHandler}
                        editActivityHandler={editActivityHandler}
                        setEditMode={setEditMode}
                        activity={selectedActivity} />}
                </Grid.Column>
            </Grid>
        )
    }

export default ActivityDashboard;
