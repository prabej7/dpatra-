import { Section } from '@/components';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { backend } from '@/declarations/export';
import { toast } from 'react-toastify';
import MapSheet from '@/components/user/Map/MapSheet';
import { Spinner } from '@/components/ui/spinner';

const schema = z.object({
  regNo: z.string().min(1, {
    message: 'Registration No. is required.',
  }),

  owner: z.string().min(1, {
    message: 'Owner ID is required.',
  }),

  valuation: z.string().min(1, {
    message: 'Valuation is required.',
  }),
  lat: z.string().min(1, {
    message: 'Latitude is required.',
  }),
  lon: z.string().min(1, {
    message: 'Longitude is required.',
  }),
  propertyType: z.string().min(1, {
    message: 'Property type is required.',
  }),
});

type formField = z.infer<typeof schema>;

const RegisterProperty: React.FC = () => {
  const {
    register,
    formState: { errors, isSubmitting },
    reset,
    handleSubmit,
    setError,
    setValue,
  } = useForm<formField>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (formData: formField) => {
    try {
      const { lat, lon, owner, propertyType, regNo, valuation } = formData;
      const response = await backend.registerProperty(
        String(owner),
        String(regNo),
        dp,
        BigInt(valuation),
        String(propertyType),
        [String(lat)],
        [String(lon)],
        String(new Date()),
      );

      if (response == '200') {
        toast.success('Property Registered !');
        return reset();
      }

      if (response == '202') {
        return toast.error('Already registered.');
      }
      return toast.error(response);
    } catch (error) {
      return toast.error('Something went wrong.');
    }
  };

  return (
    <Section title="Register Property" selected="Register Property">
      <div>
        <form
          className="flex flex-col gap-3 mt-6 w-96"
          onSubmit={handleSubmit(onSubmit)}
        >
          {errors.root && <p className="text-red-500">{errors.root.message}</p>}
          <Input placeholder="Registration No." {...register('regNo')} />
          {errors.regNo && (
            <p className="text-red-500">{errors.regNo.message}</p>
          )}
          <Input placeholder="Owner ID" {...register('owner')} />
          {errors.owner && (
            <p className="text-red-500">{errors.owner.message}</p>
          )}
          <Input placeholder="Valutation" {...register('valuation')} />
          {errors.valuation && (
            <p className="text-red-500">{errors.valuation.message}</p>
          )}
          <div className="w-full"></div>

          <div className="flex  gap-3">
            <Input placeholder="Latitude" {...register('lat')} />
            {errors.lat && <p className="text-red-500">{errors.lat.message}</p>}
            <Input placeholder="Longitude" {...register('lon')} />
            {errors.lon && <p className="text-red-500">{errors.lon.message}</p>}
            <MapSheet
              onLocationSelect={({ lat, lng }) => {
                setValue('lat', String(lat));
                setValue('lon', String(lng));
              }}
            />
          </div>
          <Input placeholder="Type" {...register('propertyType')} />
          {errors.propertyType && (
            <p className="text-red-500">{errors.propertyType.message}</p>
          )}
          <Button type="submit" disabled={isSubmitting} variant="pri">
            {isSubmitting ? <Spinner /> : 'Register'}
          </Button>
        </form>
      </div>
    </Section>
  );
};

export default RegisterProperty;
