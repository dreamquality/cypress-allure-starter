/**
 * User Data Builder
 * Uses the Builder pattern with Faker for generating dynamic test data
 */

import { faker } from '@faker-js/faker';
import { User } from '../api/types';

export class UserBuilder {
  private user: Partial<User>;

  constructor() {
    // Initialize with realistic fake data
    this.user = {
      name: faker.person.fullName(),
      username: faker.internet.username(),
      email: faker.internet.email(),
      phone: faker.phone.number(),
      website: faker.internet.url(),
      address: {
        street: faker.location.street(),
        suite: faker.location.secondaryAddress(),
        city: faker.location.city(),
        zipcode: faker.location.zipCode(),
        geo: {
          lat: faker.location.latitude().toString(),
          lng: faker.location.longitude().toString(),
        },
      },
      company: {
        name: faker.company.name(),
        catchPhrase: faker.company.catchPhrase(),
        bs: faker.company.buzzPhrase(),
      },
    };
  }

  /**
   * Set user ID
   */
  public withId(id: number): this {
    this.user.id = id;
    return this;
  }

  /**
   * Set user name
   */
  public withName(name: string): this {
    this.user.name = name;
    return this;
  }

  /**
   * Set username
   */
  public withUsername(username: string): this {
    this.user.username = username;
    return this;
  }

  /**
   * Set email
   */
  public withEmail(email: string): this {
    this.user.email = email;
    return this;
  }

  /**
   * Set phone
   */
  public withPhone(phone: string): this {
    this.user.phone = phone;
    return this;
  }

  /**
   * Set website
   */
  public withWebsite(website: string): this {
    this.user.website = website;
    return this;
  }

  /**
   * Set address
   */
  public withAddress(
    street: string,
    suite: string,
    city: string,
    zipcode: string,
    lat?: string,
    lng?: string
  ): this {
    this.user.address = {
      street,
      suite,
      city,
      zipcode,
      geo: {
        lat: lat || faker.location.latitude().toString(),
        lng: lng || faker.location.longitude().toString(),
      },
    };
    return this;
  }

  /**
   * Set company
   */
  public withCompany(name: string, catchPhrase: string, bs: string): this {
    this.user.company = {
      name,
      catchPhrase,
      bs,
    };
    return this;
  }

  /**
   * Remove optional fields
   */
  public minimal(): this {
    delete this.user.phone;
    delete this.user.website;
    delete this.user.address;
    delete this.user.company;
    return this;
  }

  /**
   * Build the user object
   */
  public build(): Partial<User> {
    return { ...this.user };
  }

  /**
   * Build and return as full User (with required fields)
   */
  public buildFull(): User {
    return {
      id: this.user.id || faker.number.int({ min: 1, max: 10000 }),
      name: this.user.name || faker.person.fullName(),
      username: this.user.username || faker.internet.username(),
      email: this.user.email || faker.internet.email(),
      ...this.user,
    } as User;
  }

  /**
   * Static method to create a new builder
   */
  public static create(): UserBuilder {
    return new UserBuilder();
  }

  /**
   * Static method to create a minimal user
   */
  public static createMinimal(): Partial<User> {
    return UserBuilder.create().minimal().build();
  }

  /**
   * Static method to create an array of users
   */
  public static createMany(count: number): Partial<User>[] {
    return Array.from({ length: count }, () => UserBuilder.create().build());
  }
}
