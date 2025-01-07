"use client";
import { FlightCard } from "@/components/entities/flightCard";
import { FlightsSort } from "@/components/features/flightsSort";
import React, { useEffect } from "react";
import styles from "./styles.module.scss";
import { useAppDispatch, useAppSelector } from "@/components/shared/lib/store";
import {
  fetchTripList,
  selectAllTrips,
  selectPage,
  selectTripList,
  selectTripsListLoading,
  setPage,
} from "@/components/entities/TripList";
import {
  useParams,
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";
import { isTripsPairs } from "@/components/shared/quards/guards";
import { Button, Skeleton } from "@mui/material";
import { getTripData } from "@/components/shared/lib/flight/getTripData";
import { Title } from "@/components/shared/ui/title";
import { tripParams } from "@/components/shared/api/trip/types";
export const FlightsBody = () => {
  const useDispatch = useAppDispatch();

  const searchParams = useSearchParams();
  const params = useParams();
  const tripList = useAppSelector(selectTripList);
  const tripListLoading = useAppSelector(selectTripsListLoading);
  const page = useAppSelector(selectPage);
  const allTrips = useAppSelector(selectAllTrips);
  const router = useRouter();
  const pathname = usePathname();
  const { getQuery } = getTripData();

  useEffect(() => {
    const query = getQuery();
    const  typedParams = params as tripParams
    useDispatch(fetchTripList({ query, params:typedParams }));
  }, []);

  useEffect(() => {
    const query = getQuery();
    const  typedParams = params as tripParams
    useDispatch(fetchTripList({ query, params:typedParams }));
  }, [searchParams]);

  const setPageOnClick = () => {
    const currentParams = new URLSearchParams(searchParams.toString());
    currentParams.set("page", String(page + 1));
    useDispatch(setPage(page + 1));
    router.push(`${pathname}?${currentParams.toString()}`, { scroll: false });
  };

  return (
    <div className={styles.body}>
      <FlightsSort />
      <div className={styles.cards}>
        {!tripList && (
          <Title size="medium" color="#000">
            Рейсов не найдено
          </Title>
        )}
        {tripListLoading &&
          Array.from(Array(5).keys()).map((el, i) => (
            <Skeleton key={i} variant="rounded" className={styles.tripLoader} />
          ))}
        {!tripListLoading &&
          tripList &&
          tripList.map((el) => {
            if (isTripsPairs(el))
              return (
                <FlightCard
                  key={
                    el[0].map((el) => el.uid).join(",") +
                    el[1].map((el) => el.uid).join(",")
                  }
                  data={el}
                />
              );
            if (!isTripsPairs(el))
              return (
                <FlightCard key={el.map((el) => el.uid).join(",")} data={el} />
              );
          })}
        {tripList && tripList.length < allTrips && (
          <Button
            onClick={() => setPageOnClick()}
            variant="contained"
            sx={{ alignSelf: "center" }}
          >
            Показать ещё
          </Button>
        )}
      </div>
    </div>
  );
};
