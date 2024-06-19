import axios from "axios";

// Fake API call to retrieve sales data from 2017
export function mockAPICall() {
    const action: APIAction = {
        type: 'MOCK_API_CALL',
        payload: {}
    };
    return (dispatch: any) => {
        const fetchData = async () => {
            try {
                const responseData = await axios.get('data2017.json');
                action.payload = responseData.data[0];
                dispatch(action);
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    };
};