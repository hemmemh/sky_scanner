"use client";
import { useSearchParams } from "next/navigation";
import { useCallback, useMemo } from "react";
import { useAppDispatch, useAppSelector } from "../store";
import { ITrip } from "../../api/trip";
import { isTripsPairs } from "../../quards/guards";
import {
  addLovesAction,
  deleteLovesAction,
  selectUser,
} from "@/components/entities/user";

type IUseLoves = ITrip[] | [ITrip[], ITrip[]] | null;
export const UseLoves = (data: IUseLoves) => {
  const useDispatch = useAppDispatch();

  const user = useAppSelector(selectUser);
  const paraps = useSearchParams();

  const addToLovesButton = useCallback(() => {
    if (!user || !data) return;
    const seatNumber = paraps.get("seatNumber") ?? 0;
    if (isTripsPairs(data)) {
      const to_positions = data[1].map((el) => el.uid);
      const from_positions = data[0].map((el) => el.uid);
      useDispatch(
        addLovesAction({
          user,
          from: data[0],
          to: data[1],
          to_positions,
          from_positions,
          seatNumber: +seatNumber,
        }),
      );
    } else {
      const from_positions = data.map((el) => el.uid);
      useDispatch(
        addLovesAction({
          user,
          from: data,
          from_positions,
          seatNumber: +seatNumber,
        }),
      );
    }
  }, [user, data]);

  const deleteLovesButton = useCallback(() => {
    if (!user || !data) return;

    if (isTripsPairs(data)) {
      const to_positions = data[1].map((el) => el.uid);
      const from_positions = data[0].map((el) => el.uid);
      const finded = user.loves.find(
        (el) =>
          el.from_positions.every((pos) => from_positions.includes(pos)) &&
          el.to_positions.every((pos) => to_positions.includes(pos)),
      );
      if (finded) {
        useDispatch(deleteLovesAction(finded.uid));
      }
    } else {
      const to_positions = data.map((el) => el.uid);
      const finded = user.loves.find((el) =>
        el.to_positions.every((pos) => to_positions.includes(pos)),
      );
      if (finded) {
        useDispatch(deleteLovesAction(finded.uid));
      }
    }
  }, [user, data]);

  const isLoved = useCallback(() => {
    if (!user || !data) return false;

    if (isTripsPairs(data)) {
      const finded = user.loves.find((loves) => {
        const fromOrder = loves.from.every((trip) => {
          const findedTrip = data[0].find((el) => el.uid === trip.uid);
          if (!findedTrip) return false;
          return true;
        });

        const toOrder = loves.to.every((trip) => {
          const findedTrip = data[1].find((el) => el.uid === trip.uid);

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
      const finded = user.loves.find((loves) => {
        return loves.from.every((trip) => {
          const findedTrip = data.find((el) => el.uid === trip.uid);

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
  }, [user, data]);

  const loved = useMemo(() => isLoved(), [isLoved]);

  return { addToLovesButton, deleteLovesButton, loved };
};
