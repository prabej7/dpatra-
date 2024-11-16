import { Mobile } from '@/components';
import { Input } from '@/components/ui/input';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { Button } from '@/components/ui/button';
import { backend } from '@/declarations/export';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import { Spinner } from '@/components/ui/spinner';

const schema = z.object({
  userid: z.string().min(1, {
    message: 'User ID is required.',
  }),
  password: z.string().min(8, {
    message: 'Password is required.',
  }),
});

type formField = z.infer<typeof schema>;

const Home: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<formField>({
    resolver: zodResolver(schema),
  });
  const [_, setCookie] = useCookies(['token']);
  const navigate = useNavigate();
  const onSubmit = async (formData: formField) => {
    try {
      const { userid, password } = formData;
      const { message, token } = await backend.login(String(userid), password);

      if (message == '200') {
        setCookie('token', token);
        navigate('/mobile/account');
        return;
      }

      if (message == '401') {
        return toast.error('Either username or password is incorrect.');
      }

      return toast.error("User does't exists.");
    } catch (error) {
      toast.error('Internal Server Error.');
    }
  };
  return (
    <>
      <Mobile>
        <div className="flex h-screen flex-col justify-center items-center">
          <form
            className="flex flex-col gap-3 w-64 justify-center"
            onSubmit={handleSubmit(onSubmit)}
          >
            <p className="text-gradient text-3xl font-bold">Login to DPatra</p>
            <Input placeholder="User ID" {...register('userid')} />
            {errors.userid && (
              <p className="text-red-500">{errors.userid.message}</p>
            )}
            <Input
              type="password"
              placeholder="Password"
              {...register('password')}
            />
            {errors.password && (
              <p className="text-red-500">{errors.password.message}</p>
            )}
            <Button type="submit" disabled={isSubmitting} variant="pri">
              {isSubmitting ? <Spinner /> : 'Login'}
            </Button>
            <p className="text-center text-sm">
              Note: Reach out the admin to recover your password.
            </p>
          </form>
        </div>
      </Mobile>
    </>
  );
};

export default Home;
