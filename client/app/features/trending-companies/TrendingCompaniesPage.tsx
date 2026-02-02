import { RightOutlined } from "@ant-design/icons";
import { Alert, Select, Spin } from "antd";
import Image from "next/image";
import { countryCodeToFlagEmoji, getCompanyLogo } from "../../shared/utils";
import { CompaniesPagination } from "./components/CompaniesPagination";
import { CompanyPopover } from "./components/CompanyPopover";
import { DocPreviewModal } from "./components/DocPreviewModal";
import { EventsModal } from "./components/EventsModal";
import styles from "./styles/TrendingCompaniesPage.module.css";
import { CountryFilter, type ITrendingCompaniesPage } from "./types";

export const TrendingCompaniesPage = (props: ITrendingCompaniesPage) => {
  const countryOptions = [
  {
    value: CountryFilter.ALL,
    label: "🌍 ALL",
    key: CountryFilter.ALL,
  },
  ...props.countries.map((country) => ({
    value: country,
    label: `${countryCodeToFlagEmoji(country)} ${country}`,
    key: country,
  })),
];

  return (
    <section className={styles.surface} aria-label="Trending companies section">
      <div className={styles.inner}>
        {/* Header */}
        <header className={styles.header}>
          <span className={styles.title}>Trending companies</span>

          {props.countries.length > 0 && (
            <div className={styles.filter}>
              <span>Country</span>
              <Select
                value={props.selectedCountry}
                onChange={props.onCountryChange}
                options={countryOptions}
                size="small"
                className={styles.countrySelect}
                classNames={{ popup: { root: styles.countryDropdown } }}
              />
            </div>
          )}
        </header>

        {/* Loading */}
        {props.isLoading && (
          <div className={styles.stateRow}>
            <Spin />
            <span>Loading…</span>
          </div>
        )}

        {/* Error */}
        {!props.isLoading && props.error && (
          <Alert type="error" showIcon description={props.error} />
        )}

        {/* Popovers & Modals */}
        {props.company && (
          <CompanyPopover
            company={props.company}
            latestEvent={props.latestEvent}
            onClose={props.onCloseCompany}
            onOpenAllEvents={props.onOpenAllEvents}
            onOpenDocPreview={props.onOpenDocPreview}
          />
        )}

        {props.company && (
          <EventsModal
            company={props.company}
            isOpen={props.isEventsOpen}
            events={props.sortedEvents}
            page={props.eventsPage}
            totalPages={props.totalEventPages}
            onPageChange={props.onEventsPageChange}
            onClose={props.onCloseAllEvents}
            onOpenDocPreview={props.onOpenDocPreview}
          />
        )}

        {props.docUrl && (
          <DocPreviewModal
            url={props.docUrl}
            title={props.docTitle}
            zoom={props.docZoom}
            onZoomChange={props.onDocZoomChange}
            onClose={props.onCloseDoc}
          />
        )}

        {/* Company list */}
        {!props.isLoading && !props.error && (
          <div className={styles.list}>
            {props.companies.map((company) => {
              const logo = getCompanyLogo(company);
              const isOpen = props.companyId === company.companyId;

              return (
                <button
                  type="button"
                  key={company.companyId}
                  className={styles.row}
                  onClick={() => props.onToggleCompany(company.companyId)}
                  aria-expanded={isOpen}
                >
                  <div className={styles.rowContent}>
                    <div className={styles.logoBox}>
                      {logo && (
                        <Image
                          src={logo.src}
                          alt={logo.alt}
                          fill
                          sizes="40px"
                          className={styles.logo}
                        />
                      )}
                    </div>

                    <div className={styles.textStack}>
                      <div className={styles.name}>
                        {company.displayName || company.companyName}
                      </div>
                      <div className={styles.desc}>{company.description}</div>
                    </div>

                    <RightOutlined className={styles.chevron} />
                  </div>

                  <div aria-hidden className={styles.divider} />
                </button>
              );
            })}
          </div>
        )}

        {/* Pagination */}
        <div className={styles.pagination}>
          <CompaniesPagination
            visible={props.totalPages > 1}
            page={props.page}
            totalPages={props.totalPages}
            onPageChange={props.onPageChange}
          />
        </div>
      </div>
    </section>
  );
};
