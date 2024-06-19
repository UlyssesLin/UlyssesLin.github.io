type DashboardState = {
    title: string
    image: string
    subtitle: string
    brand: string
    tags: string[]
    sales: GenericObject[]
};
  
type APIAction = {
    type: string
    payload: GenericObject
};

type GenericObject = { [key: string]: any };
  
type DispatchType = (args: DashboardAction) => DashboardAction;