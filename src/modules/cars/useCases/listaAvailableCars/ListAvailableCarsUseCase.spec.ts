import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { ListAvailableCarsUseCase } from "./ListAvailableCarsUseCase";

let listAvailableCarsUseCase: ListAvailableCarsUseCase
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe("List Cars", ()=> {
  beforeEach(()=> {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    listAvailableCarsUseCase = new ListAvailableCarsUseCase(carsRepositoryInMemory);
  })

  it("should be able to list all available cars", async ()=> {
   const car = await  carsRepositoryInMemory.create({
      
        name: "Car 1",
        description: "Car Description",
        daily_rate: 140.00 ,
        license_plate: "TKI-1534",
        fine_amount: 100,
        brand: "car Brand",
        category_id: "category_id",
      
    })
   const cars = await listAvailableCarsUseCase.execute({});
   expect(cars).toEqual([car])
  })

  it("should be able to list all available cars by brand", async () => {
    const car = await  carsRepositoryInMemory.create({
      
      name: "Car 2",
      description: "Car Description",
      daily_rate: 140.00 ,
      license_plate: "TKI-1534",
      fine_amount: 100,
      brand: "car_Brand",
      category_id: "category_id",
  });

  const cars = await listAvailableCarsUseCase.execute({
    brand: "Car_brand"
  })
  

  expect(cars).toEqual([car])
});
it("should be able to list all available cars by name", async () => {
  const car = await  carsRepositoryInMemory.create({
    
    name: "Car 3",
    description: "Car Description",
    daily_rate: 140.00 ,
    license_plate: "TKI-4534",
    fine_amount: 100,
    brand: "car_Brand",
    category_id: "category_id",
});

const cars = await listAvailableCarsUseCase.execute({
  name: "Car 3"
})


expect(cars).toEqual([car])
});

it("should be able to list all available cars by category", async () => {
  const car = await  carsRepositoryInMemory.create({
    
    name: "Car 2",
    description: "Car Description",
    daily_rate: 140.00 ,
    license_plate: "TKI-1534",
    fine_amount: 100,
    brand: "car_Brand",
    category_id: "12345",
});

const cars = await listAvailableCarsUseCase.execute({
  category_id: "12345"
})


expect(cars).toEqual([car])
});
});