"use client";
import { useCallback, useMemo, useState } from "react";

import { useAppDispatch, useAppSelector } from "../store";
import { ITrip } from "../../api/trip";
import { isTripsPairs } from "../../quards/guards";
import { addOrderAction, selectUser } from "@/components/entities/user";

type IUseOrder = ITrip[] | [ITrip[], ITrip[]] | null;

export const UseOrder = (trips: IUseOrder) => {
  const [snackBarOpen, setSnackBarOpen] = useState(false);
  const [snackBarMessage, setSnackBarMessage] = useState("");

  const useDispatch = useAppDispatch();

  const user = useAppSelector(selectUser);

  const addToOrder = useCallback(() => {
    if (!user) {
      setSnackBarOpen(true);
      setSnackBarMessage("Не авторизован");
      return;
    }

    if (user && trips) {
      if (isTripsPairs(trips)) {
        const to_positions = trips[1].map((el) => el.uid);
        const from_positions = trips[0].map((el) => el.uid);
        useDispatch(
          addOrderAction({
            user,
            from: trips[0],
            to: trips[1],
            to_positions,
            from_positions,
          }),
        )
          .then(() => {
            setSnackBarOpen(true);
            setSnackBarMessage("Успешное офромление билета");
          })
          .catch((error) => {
            setSnackBarOpen(true);
            setSnackBarMessage(error.data.response.message);
          });
      } else {
        const from_positions = trips.map((el) => el.uid);
        useDispatch(addOrderAction({ user, from: trips, from_positions }))
          .then(() => {
            setSnackBarOpen(true);
            setSnackBarMessage("Успешное офромление билета");
          })
          .catch((error) => {
            setSnackBarOpen(true);
            setSnackBarMessage(error.data.response.message);
          });
      }
    }
  }, [user, trips]);

  const isOrderPayed = useCallback(() => {
    if (!trips || !user) return false;
    console.log("trips", trips, user.orders);

    if (isTripsPairs(trips)) {
      const finded = user.orders.find((order) => {
        const fromOrder = order.from.every((trip) => {
          const findedTrip = trips[0].find((el) => el.uid === trip.uid);
          if (!findedTrip) return false;
          return true;
        });

        const toOrder = order.to.every((trip) => {
          const findedTrip = trips[1].find((el) => el.uid === trip.uid);

          if (!findedTrip) return false;
          return true;
        });
        return fromOrder && toOrder;
      });

      if (finded) {
        return true;
      } else {
        return false;
      }
    } else {
      const finded = user.orders.find((order) => {
        return order.from.every((trip) => {
          const findedTrip = trips.find((el) => el.uid === trip.uid);

          if (!findedTrip) return false;
          return true;
        });
      });

      if (finded) {
        return true;
      } else {
        return false;
      }
    }
  }, [user, trips]);

  const payedOrder = useMemo(() => isOrderPayed(), [isOrderPayed]);

  return {
    addToOrder,
    setSnackBarMessage,
    payedOrder,
    snackBarOpen,
    snackBarMessage,
    setSnackBarOpen,
  };
};
