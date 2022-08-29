import studentApi from '@/api/studentApi';
import { randomString } from '@/utils';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { navigate } from '@/utils/event';

export default function AddStudent() {

  const schema = yup.object().shape({
    name: yup.string().required(),
    age: yup.number().required().min(6).default(15),
    mark: yup.number().min(0).max(10).default(9),
    gender: yup.mixed().oneOf(['male', 'female', 'unisex']).default('male'),
    city: yup.string().required()
  });

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  });

  const onsubmit = async (data: any) => {
    await studentApi.add({
      id: randomString(10),
      createdAt: 1633700485643,
      updatedAt: 1633700485643,
      ...data
    });
    navigate({to: '/students'});
  };

  return (
    <>
      <h4>Add New Student: </h4>
      <form onSubmit={handleSubmit(onsubmit)}>
        <div>
          <label>Name: </label>
          <input type="text" placeholder="student name" {...register('name')} />
          {errors.name && <p className="error">{errors.name.message as string}</p>}
        </div>
        <div>
          <label>Age: </label>
          <input type="number" id='_age' defaultValue={15} {...register('age')} />
          {errors.age && <p className="error">{errors.age.message as string}</p>}
        </div>
        <div>
          <label>Mark: </label>
          <input type="number" id='_mark' defaultValue={9} {...register('mark')} />
          {errors.mark && <p className="error">{errors.mark.message as string}</p>}
        </div>
        <div>
          <label>Gender: </label>
          <select id="_gender" {...register('gender')}>
            <option value="male" >Male</option>
            <option value="female" >Female</option>
            <option value="unisex" >Unisex</option>
          </select>
          {errors.gender && <p className="error">{errors.gender.message as string}</p>}
        </div>
        <div>
          <label htmlFor="_city">City: </label>
          <input type="text" id='_city' placeholder='city name' {...register('city')} />
          {errors.city && <p className="error">{errors.city.message as string}</p>}
        </div>
        <button type='submit'>Submit</button>
      </form>
    </>
  );
}
