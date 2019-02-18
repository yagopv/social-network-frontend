// Method decorator
export default function() {
  return (
    target: Object,
    propertyKey: string,
    descriptor: TypedPropertyDescriptor<any>
  ): any => {
    console.log(target, propertyKey, descriptor);
    return descriptor;
  };
}

// Class decorator
// export default function(): ClassDecorator {
//   return (constructor: any): any => {
//     console.log(constructor);
//   };
// }
