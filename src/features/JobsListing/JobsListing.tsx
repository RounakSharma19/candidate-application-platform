/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback, useEffect, useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Button,
  Grid,
  Box,
  Avatar,
  Stack,
} from "@mui/material";
import { PostedChip } from "./PostedChip";
import { capitalizeFirst, isUndefinedOrNull, WithRupeeSymbol } from "@utils";
import { jobs } from "@lang";
import {
  MinExperienceDropdown,
  Render,
  LocationDropdown,
  RoleDropdown,
  MinBasePayDropdown,
  SearchBar,
  BadgeAvatars,
  ShellWrapper,
} from "@components";
import { Bolt, CheckOutlined } from "@mui/icons-material";
import { TExperienceLevel, TMinBasePay, TRole } from "./index";
import { useDebounce } from "@hooks";
import { fetchJobs } from "@api";
import { useInfiniteQuery } from "@tanstack/react-query";

const MAX_DESCRIPTION_LENGTH = 200;
const MAX_LINES_INITIAL = 5;

export const JobsListing = (): JSX.Element => {
  const useMessage = jobs.listing;
  const localized = {
    estimated: useMessage.estimatedSalary,
    aboutComapny: useMessage.aboutComapny,
    aboutUs: useMessage.aboutUs,
    easyApply: useMessage.easyApply,
    unlock: useMessage.unlock,
    minExperience: useMessage.minExperience,
    years: useMessage.years,
    year: useMessage.year,
    search: useMessage.search,
    min: useMessage.min,
    location: useMessage.location,
    roles: useMessage.roles,
    experience: useMessage.experience,
    noJobsFound: useMessage.noJobsFound,
  };

  const [expandedDescriptions, setExpandedDescriptions] = useState<{
    [key: string]: boolean;
  }>({});
  const [selectedExperience, setSelectedExperience] =
    useState<TExperienceLevel | null>(null);
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null);
  const [selectedRole, setSelectedRole] = useState<TRole | null>(null);
  const [selectedBasePay, setSelectedBasePay] = useState<TMinBasePay | null>(
    null
  );
  const [searchQuery, setSearchQuery] = useState("");

  const debouncedSearchValue = useDebounce(searchQuery, 500);

  const { data, isLoading, isError, fetchNextPage, hasNextPage } =
    useInfiniteQuery({
      queryKey: [
        "jobs",
        {
          limit: 10,
          offset: 0,
          filters: {
            selectedExperience,
            selectedLocation,
            selectedRole,
            selectedBasePay,
          },
        },
      ],
      queryFn: fetchJobs,
      // @ts-expect-error: Unreachable code error
      getNextPageParam: (lastPage, allPages) => {
        return allPages.length + 1 <= lastPage.totalPages
          ? allPages.length + 1
          : null;
      },
    });

  const finalData = data?.pages.flatMap((page) => page.jdList) || [];

  const filteredJobs = finalData?.filter(
    (job: any) =>
      (!selectedExperience ||
        (job.minExp <= selectedExperience.maxExp &&
          job.maxExp >= selectedExperience.minExp)) &&
      (!selectedLocation || job.location === selectedLocation) &&
      (!selectedRole ||
        (typeof job.jobRole === "string" &&
          job.jobRole.toLowerCase() === selectedRole.jobRole.toLowerCase())) &&
      (!selectedBasePay ||
        (typeof job.minJdSalary === "number" &&
          job.minJdSalary >= selectedBasePay.minJdSalary)) &&
      (debouncedSearchValue.trim() === "" ||
        job.location.toLowerCase().includes(debouncedSearchValue.toLowerCase()))
  );

  const observeLastJobRef = useCallback(
    (node: HTMLElement | null) => {
      if (!node || isLoading || isError || !hasNextPage) return;

      const observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          fetchNextPage();
        }
      });

      observer.observe(node);

      return () => {
        observer.disconnect();
      };
    },
    [isLoading, isError, hasNextPage, fetchNextPage]
  );

  const lastUnfilteredJobIndex = finalData.findIndex((job) =>
    filteredJobs.includes(job)
  );

  const currentIndex = 0;
  const isLastJob =
    lastUnfilteredJobIndex !== -1 && currentIndex === lastUnfilteredJobIndex;

  const toggleDescription = (jobUid: string) => {
    setExpandedDescriptions((prev) => ({
      ...prev,
      [jobUid]: !prev[jobUid],
    }));
  };

  const handleScroll = useCallback(() => {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

    if (scrollTop + clientHeight >= scrollHeight) {
      const lastJobNode = document.querySelector(".last-job");
      if (lastJobNode instanceof HTMLElement) {
        observeLastJobRef(lastJobNode);
      }
    }
  }, [observeLastJobRef]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);

  return (
    <ShellWrapper isLoading={isLoading} isError={isError}>
      <Box
        display="flex"
        flexWrap="wrap"
        justifyContent="space-between"
        padding={3}
        onScroll={handleScroll}
      >
        <Grid
          container
          spacing={2}
          marginBottom={3}
          marginTop={3}
          padding={0.5}
        >
          <Grid item>
            <MinExperienceDropdown
              value={selectedExperience}
              onChange={(value) => setSelectedExperience(value)}
              variant="outlined"
              size="small"
              width={180}
              placeholder={localized.experience}
            />
          </Grid>
          <Grid item>
            <LocationDropdown
              value={selectedLocation}
              onChange={(value) => setSelectedLocation(value)}
              variant="outlined"
              size="small"
              width={230}
              placeholder={localized.location}
            />
          </Grid>
          <Grid item>
            <RoleDropdown
              value={selectedRole}
              onChange={(value) => setSelectedRole(value)}
              variant="outlined"
              size="small"
              width={230}
              placeholder={localized.roles}
            />
          </Grid>
          <Grid item>
            <MinBasePayDropdown
              value={selectedBasePay}
              onChange={(value) => setSelectedBasePay(value)}
              variant="outlined"
              size="small"
              width={260}
              placeholder={localized.min}
            />
          </Grid>
          <Grid item>
            <SearchBar
              onSearch={(value) => {
                setSearchQuery(value);
              }}
              placeholder={localized.search}
              value={searchQuery}
              size="small"
            />
          </Grid>
        </Grid>
        <Render if={filteredJobs && filteredJobs.length > 0}>
          <Grid container spacing={2}>
            {filteredJobs?.map((job: any) => (
              <Grid
                item
                xs={12}
                sm={6}
                md={4}
                key={job.jdUid}
                marginBottom={4}
                ref={isLastJob ? observeLastJobRef : null}
              >
                <Card
                  sx={{
                    border: 1,
                    borderRadius: 5,
                    boxShadow: 2,
                    borderColor: "#fafaf7",
                    maxWidth: "450px",
                  }}
                >
                  <CardContent>
                    <PostedChip />
                    <Box
                      display="flex"
                      alignItems="center"
                      marginTop={2}
                      marginBottom={2}
                    >
                      <Avatar
                        src={job?.logoUrl}
                        sx={{ ml: 2, borderRadius: 0, height: 80, width: 80 }}
                      />

                      <Box ml={1.5} display="flex" flexDirection="column">
                        <Typography
                          variant="h6"
                          marginBottom={0.5}
                          color="#4c5969"
                        >
                          {capitalizeFirst(job?.companyName)}
                        </Typography>
                        <Typography
                          variant="h5"
                          fontWeight="bold"
                          marginBottom={0.5}
                        >
                          {capitalizeFirst(job.jobRole)}
                        </Typography>
                        <Render if={job.location}>
                          <Typography variant="h6" fontWeight="normal">
                            {capitalizeFirst(job.location)}
                          </Typography>
                        </Render>
                      </Box>
                    </Box>
                    <Render if={job.maxJdSalary}>
                      <Typography
                        variant="h5"
                        color="#4c5969"
                        marginBottom={2}
                        fontWeight={500}
                      >
                        {localized.estimated}
                        {`${isUndefinedOrNull(
                          job.minJdSalary
                        )} - ${isUndefinedOrNull(job.maxJdSalary)} `}
                        {`${WithRupeeSymbol(job.salaryCurrencyCode)}`}
                        <CheckOutlined
                          sx={{
                            color: "white",
                            bgcolor: "#00b602",
                            ml: 1,
                            borderRadius: 1,
                            fontSize: "15px",
                          }}
                        />
                      </Typography>
                    </Render>
                    <Typography
                      variant="h5"
                      fontWeight="bold"
                      color="text.primary"
                    >
                      {localized.aboutComapny}
                    </Typography>
                    <Typography
                      variant="h6"
                      fontWeight="bold"
                      color="text.primary"
                      marginBottom={2}
                    >
                      {localized.aboutUs}
                    </Typography>
                    <Typography
                      variant="body1"
                      color="text.primary"
                      sx={{
                        display: "-webkit-box",
                        WebkitLineClamp: expandedDescriptions[job.jdUid]
                          ? "unset"
                          : MAX_LINES_INITIAL,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                        marginBottom: "0.5rem",
                        transition: "all 0.3s ease-in-out",
                        opacity: expandedDescriptions[job.jdUid] ? 1 : 0.5,
                      }}
                    >
                      {job.jobDetailsFromCompany}
                    </Typography>

                    <Box
                      display="flex"
                      justifyContent="center"
                      marginBottom={3}
                    >
                      <Render
                        if={
                          job.jobDetailsFromCompany.length >
                          MAX_DESCRIPTION_LENGTH
                        }
                      >
                        <Button
                          variant="text"
                          size="small"
                          onClick={() => toggleDescription(job.jdUid)}
                          sx={{
                            transition: "all 0.3s ease-in-out",
                            opacity: expandedDescriptions[job.jdUid] ? 1 : 0.5,
                            color: "#4943da",
                          }}
                        >
                          {expandedDescriptions[job.jdUid]
                            ? "View Job"
                            : "View Job"}
                        </Button>
                      </Render>
                    </Box>
                    <Typography
                      variant="h5"
                      fontWeight="normal"
                      color="#9c9c9c"
                    >
                      {localized.minExperience}
                    </Typography>

                    <Typography
                      variant="h5"
                      fontWeight="normal"
                      color="#212121"
                    >
                      {`${isUndefinedOrNull(job.minExp)} ${
                        job.minExp === 1 ? localized.year : localized.years
                      }`}
                    </Typography>

                    <Button
                      variant="contained"
                      color="primary"
                      fullWidth
                      sx={{
                        mt: 1,
                        borderRadius: 2,
                        fontWeight: "bold",
                        padding: 1.5,
                        backgroundColor: "#54efc3",
                        marginBottom: 1.7,
                      }}
                      startIcon={<Bolt sx={{ color: "#ffd768" }} />}
                    >
                      {localized.easyApply}
                    </Button>

                    <Button
                      variant="contained"
                      fullWidth
                      sx={{
                        mt: 1,
                        borderRadius: 2,
                        fontWeight: "bold",
                        padding: 1.5,
                        backgroundColor: "#4943da",
                        color: "#fff",
                      }}
                    >
                      <Stack direction="row" spacing={1}>
                        <BadgeAvatars />

                        <BadgeAvatars />
                      </Stack>

                      <span>&nbsp;&nbsp;</span>

                      {localized.unlock}
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Render>
        <Render
          if={!filteredJobs || (filteredJobs && filteredJobs.length === 0)}
        >
          <Typography variant="h6" color="text.secondary">
            {localized.noJobsFound}
          </Typography>
        </Render>
      </Box>
    </ShellWrapper>
  );
};
