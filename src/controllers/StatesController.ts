import { Request, Response } from 'express';
import StatesModel from '../models/StatesModel';

function filterState(state: StateName): StateData | undefined {
  // Make sure the state is in our dataset
  if (!(state in StatesModel.stateCapitals)) {
    return undefined; // If it isn't then terminate the function
  }

  // Otherwise assume everything is ok
  const stateCapital = StatesModel.stateCapitals[state] as string;
  const stateData: StateData = {
    state,
    capital: stateCapital,
  };
  return stateData;
}

function getCapital(req: Request, res: Response): void {
  if (req.query.state) {
    const { state } = req.query as CapitalRequestQuery;
    const stateData = filterState(state);

    if (stateData) {
      console.log(`User requested data for ${state}`);
      res.json(stateData);
    } else {
      console.log(`User requested data for ${state} but it is not in our dataset`);
      res.sendStatus(404);
    }
  } else {
    console.log('User is requesting all state data');
    res.json(StatesModel.stateCapitals);
  }
}

function addCapital(req: Request, res: Response): void {
  res.sendStatus(501); // 501 Not Implemented
}

export default { getCapital, addCapital };
