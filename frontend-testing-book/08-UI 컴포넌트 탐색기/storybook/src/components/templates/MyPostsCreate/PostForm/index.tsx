import { PostFormFooter } from "@/components/molecules/PostFormFooter";
import { PostFormHeroImage } from "@/components/molecules/PostFormHeroImage";
import { PostFormInfo } from "@/components/molecules/PostFormInfo";
import { TextareaWithInfo } from "@/components/molecules/TextareaWithInfo";
import { createMyPostInputSchema } from "@/lib/schema/MyPosts";
import { PostInput } from "@/pages/api/my/posts";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  FieldValues,
  SubmitErrorHandler,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import styles from "./styles.module.css";

type Props<T extends FieldValues = PostInput> = {
  title: string;
  children?: React.ReactNode;
  onClickSave: (isPublish: boolean) => void;
  onValid: SubmitHandler<T>;
  onInvalid?: SubmitErrorHandler<T>;
};

export const PostForm = (props: Props) => {
  const {
    register,
    setValue,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<PostInput>({
    // 입력 내용을 검증할 유효성 검사 스키마 객체를 할당 가능
    // => 스키마에 부합하지 않은 내용이 포함됐으면 오류 메시지를 errors 저장
    resolver: zodResolver(createMyPostInputSchema),
  });
  return (
    <form
      aria-label={props.title}
      className={styles.module}
      onSubmit={handleSubmit(props.onValid, props.onInvalid)}
    >
      <div className={styles.content}>
        <div className={styles.meta}>
          <PostFormInfo register={register} control={control} errors={errors} />
          <PostFormHeroImage
            register={register}
            setValue={setValue}
            name="imageUrl"
            error={errors.imageUrl?.message}
          />
        </div>
        <TextareaWithInfo
          {...register("body")}
          title="본문"
          rows={20}
          error={errors.body?.message}
        />
      </div>
      <PostFormFooter
        isSubmitting={isSubmitting}
        register={register}
        control={control}
        onClickSave={props.onClickSave}
      />
      {props.children}
    </form>
  );
};
