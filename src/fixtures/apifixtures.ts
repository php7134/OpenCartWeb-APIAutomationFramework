import { test as baseTest } from '@playwright/test';

import { ApiHelper } from '../api/apiHelper';


//define types for api fixtures:
type Apifixtures =
    {
        apiHelper: ApiHelper
    }

export let test=baseTest.extend<Apifixtures>(
    {
        apiHelper: async ({ request }, use) => {
            let apiHelper = new ApiHelper(request, process.env.API_BASE_URL!);
            await use(apiHelper);
        }
    })

    export {expect} from '@playwright/test';
