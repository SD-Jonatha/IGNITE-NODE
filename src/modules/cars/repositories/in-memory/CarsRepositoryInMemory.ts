import { ICreateCarDTO } from "@modules/cars/dtos/ICreateCarDTO";
import { Car } from "@modules/cars/infra/typeorm/entities/Car";
import { ICarsRepository } from "../ICarsRepository";


class CarsRepositoryInMemory implements ICarsRepository {
 
  
  cars: Car[] = [];
 async  create({brand, category_id, daily_rate, description, fine_amount, name, license_plate}: ICreateCarDTO): Promise<Car> {
    const cars = new Car();

    Object.assign(cars, {brand, category_id, daily_rate, description, fine_amount, name, license_plate})
    this.cars.push(cars)

    return cars;
  }

async  findByLicensePlate(license_plate: string): Promise<Car> {
    return this.cars.find((car) => car.license_plate === license_plate);
  
}
async  findAvailable(brand?:string, category_id?: string, name?: string): Promise<Car[]> {
  const all = this.cars
  .filter((car) => {
    
    if(car.available === true || ((brand && car.brand === brand)||
    (category_id && car.category_id === category_id) ||
    (name && car.name === name)))
    {
      return car
    }
    return null
  })
  
      
      return all;
  }

async findById(id: string): Promise<Car> {
  return this.cars.find((car)=> car.id === id)
}
}
export {CarsRepositoryInMemory}