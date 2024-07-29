import { useState } from "react";
import { ContactNumber } from "./ContactNumber";
import { DeliveryAddress } from "./DeliveryAddress";
import { PastDeliveryAddress } from "./PastDeliveryAddress";
import { RegisterDeliveryAddress } from "./RegisterDeliveryAddress";

/**
 * 테스트할 상황
 * 1. 이전 배송지가 없는 경우
 * 2. 이전 배송지가 있는데 새로운 배송지를 입력하지 않는 경우
 * 3. 이전 배송지가 있는데 새로운 배송지를 입력하는 경우
 */
export type AddressOption = React.ComponentProps<"option"> & { id: string };
export type Props = {
  deliveryAddresses?: AddressOption[];
  onSubmit?: (event: React.FormEvent<HTMLFormElement>) => void;
};
export const Form = (props: Props) => {
  const [registerNew, setRegisterNew] = useState<boolean | undefined>(
    undefined
  );
  return (
    <form onSubmit={props.onSubmit}>
      <h2>배송지 정보 입력</h2>
      <ContactNumber />
      {props.deliveryAddresses?.length ? (
        <>
          <RegisterDeliveryAddress onChange={setRegisterNew} />
          {registerNew ? (
            <DeliveryAddress title="새로운 배송지" />
          ) : (
            <PastDeliveryAddress
              disabled={registerNew === undefined}
              options={props.deliveryAddresses}
            />
          )}
        </>
      ) : (
        <DeliveryAddress />
      )}
      <hr />
      <div>
        <button>주문내용 확인</button>
      </div>
    </form>
  );
};
