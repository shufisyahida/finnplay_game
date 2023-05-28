"use client";
import Input from "@/components/form/Input";
import styles from "./Dashboard.module.css";
import React, { useEffect, useMemo, useRef, useState } from "react";
import Button from "@/components/form/Button";
import Image from "next/image";
import { Data, Game, Group, SortType } from "@/interfaces";
import CheckboxGroup from "@/components/form/CheckboxGroup";
import sortBy from "lodash/sortBy";
import filter from "lodash/filter";
import RadioGroup from "@/components/form/RadioGroup";
import InputRange from "@/components/form/InputRange";
import uniq from "lodash/uniq";
import { capitalize, reverse, toLower } from "lodash";
import { useRouter } from "next/navigation";

export default function Dashboard({
  username,
  data,
}: {
  username?: string;
  data: Data;
}) {
  const router = useRouter();

  const getValidGameList = (
    dataGroups: Group[] | undefined,
    dataGames: Game[] | undefined
  ): Game[] => {
    let gameIds: number[] = [];
    // get uniq gameIds id from groups
    dataGroups?.forEach((group) => {
      gameIds = uniq(gameIds.concat(group.games));
    });

    // return list of game
    return filter(dataGames, (game: Game) => gameIds.includes(game.id));
  };

  const gameList = useMemo(
    () => getValidGameList(data?.groups, data?.games),
    [data]
  );

  const [isShowFilters, setIsShowFilters] = useState(false);
  const headerRef = useRef<HTMLDivElement>(null);
  const [displayedGameList, setDisplayedGameList] = useState<Game[]>([]);

  const [query, setQuery] = useState<string>("");
  const [providerIds, setProviderIds] = useState<string[]>([]);
  const [groupIds, setGroupIds] = useState<string[]>([]);
  const [sort, setSort] = useState<string>();
  const [columnSize, setColumnSize] = useState<string>("4");

  const columnStyle = styles[`column-${columnSize}`];

  const getNewSelected = (
    selectedCheckboxes: string[],
    value: string
  ): string[] => {
    let newSelected = [];
    if (selectedCheckboxes.includes(value)) {
      newSelected = selectedCheckboxes.filter((checkbox) => checkbox !== value);
    } else {
      newSelected = [...selectedCheckboxes, value];
    }

    return newSelected;
  };

  const handleReset = () => {
    setQuery("");
    setProviderIds([]);
    setGroupIds([]);
    setSort(undefined);
    setColumnSize("4");
    setDisplayedGameList(getValidGameList(data?.groups, data?.games));
  };

  const handleFilterClick: React.MouseEventHandler<HTMLButtonElement> = () => {
    if (isShowFilters) {
      setIsShowFilters(false);
    } else {
      setIsShowFilters(true);
    }
  };

  const handleLogout: React.MouseEventHandler<HTMLButtonElement> = () => {
    fetch("/api/logout", { method: "POST" }).then((res) => {
      if (res.ok) {
        router.refresh();
      }
    });
  };

  useEffect(() => {
    if (!isShowFilters && headerRef.current) {
      headerRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [isShowFilters, headerRef.current]);

  useEffect(() => {
    let filteredList = [];

    // filter by query
    filteredList = filter(gameList, (game) =>
      toLower(game.name).includes(query)
    );

    // filter by provider
    if (providerIds.length > 0) {
      filteredList = filter(filteredList, (game: Game) =>
        providerIds.includes(game.provider.toString())
      );
    }

    // get gameIds from selected group
    let gameIds: number[] = [];
    data?.groups.forEach((group) => {
      if (groupIds.includes(group.id.toString())) {
        gameIds = uniq(gameIds.concat(group.games));
      }
    });

    // filter by game id from selected group
    if (gameIds.length > 0) {
      filteredList = filter(filteredList, (game: Game) =>
        gameIds.includes(game.id)
      );
    }

    // sort
    if (sort === SortType.Increase) {
      filteredList = sortBy(filteredList, ["name"]);
    } else if (sort === SortType.Decrease) {
      filteredList = reverse(sortBy(filteredList, ["name"]));
    } else if (sort === SortType.Newest) {
      filteredList = reverse(sortBy(filteredList, ["date"]));
    }

    setDisplayedGameList(filteredList);
  }, [query, providerIds, groupIds, sort]);

  useEffect(() => {
    setDisplayedGameList(getValidGameList(data.groups, data.games));
  }, [data]);

  return (
    <main className={styles.main} ref={headerRef}>
      <header className={styles.header} role="header">
        <Image src="/logo.svg" alt="" width={70} height={70} />
        <span>{capitalize(username)}</span>
        <Button buttonType="transparent" onClick={handleLogout}>
          <Image src="/user.svg" alt="" width={16} height={16} />
          Logout
        </Button>
      </header>
      <div className={`${styles.body} ${isShowFilters ? styles.expand : ""}`}>
        <div
          className={`${styles.list} ${columnStyle}`}
          data-testid="list-container"
        >
          {displayedGameList?.map((game) => (
            <Image
              key={game.id}
              src={game.coverLarge}
              alt={game.name}
              width={500}
              height={360}
            />
          ))}
        </div>
        <div className={`${styles.filter}`}>
          <Input
            label="Search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            search
          />
          <div className={styles.filters}>
            <CheckboxGroup
              label="Providers"
              options={sortBy(data?.providers, ["name"]).map(
                ({ id, name }) => ({
                  label: name,
                  value: id.toString(),
                })
              )}
              value={providerIds}
              onSelect={(value: string) =>
                setProviderIds(getNewSelected(providerIds, value))
              }
            />
            <CheckboxGroup
              label="Groups"
              options={sortBy(data?.groups, ["name"]).map(({ id, name }) => ({
                label: name,
                value: id.toString(),
              }))}
              value={groupIds}
              onSelect={(value: string) =>
                setGroupIds(getNewSelected(groupIds, value))
              }
            />
            <RadioGroup
              label="Sorting"
              options={[
                { label: "A-Z", value: SortType.Increase },
                { label: "Z-A", value: SortType.Decrease },
                { label: "Newest", value: SortType.Newest },
              ]}
              value={sort}
              onSelect={(value) => setSort(value)}
            />
            <InputRange
              label="Columns"
              min="2"
              max="4"
              step="1"
              className={styles.columnFilter}
              value={columnSize}
              onChange={(e) => setColumnSize(e.target.value)}
              onThumbClick={(i) => () => setColumnSize(i.toString())}
              data-testid="column-size"
            />
            <div className={styles.misc}>
              <span>Games amount: {displayedGameList?.length}</span>
              <Button onClick={handleReset}>Reset</Button>
            </div>
          </div>
          <Button
            className={styles.expandFilter}
            buttonType="transparent"
            aria-label={isShowFilters ? "Hide filters" : "Show filters"}
            aria-expanded="true"
            onClick={handleFilterClick}
          >
            <Image src="/menu.svg" alt="" width={14} height={14} />
            {isShowFilters ? "Hide filters" : "Show filters"}
          </Button>
        </div>
      </div>
    </main>
  );
}
