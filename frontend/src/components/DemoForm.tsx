import { useState, useEffect, useRef } from "react";
import type { DemoFormData, CreateDemoRequestPayload } from "../interfaces";
import Button from "./Button";
import Alert from "./Alert";
import Toast from "./Toast";
import { countries, howDidYouHearOptions } from "../data/constants";
import {
  useCreateUser,
  useVerifyEmail,
  useCreateDemoRequest,
} from "../hooks/useAuth";
import { useDebounce } from "../hooks/useDebounce";
import { setAuthToken } from "../utils/cookies";

const initialFormData: DemoFormData = {
  firstName: "",
  lastName: "",
  email: "",
  jobTitle: "",
  companyName: "",
  country: "",
  phoneNumber: "",
  companyWebsite: "",
  processingVolume: "",
  howDidYouHear: "",
  description: "",
};

function DemoForm() {
  const [formData, setFormData] = useState<DemoFormData>(initialFormData);
  const [selectedCountry, setSelectedCountry] = useState(countries[0]);
  const [verificationCode, setVerificationCode] = useState("");
  const [enteredCode, setEnteredCode] = useState("");
  const [isVerified, setIsVerified] = useState(false);
  const [showVerification, setShowVerification] = useState(false);
  const [emailChecked, setEmailChecked] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);
  const lastCheckedEmail = useRef("");

  const createUserMutation = useCreateUser();
  const verifyEmailMutation = useVerifyEmail();
  const createDemoMutation = useCreateDemoRequest();

  const isFormEnabled = isVerified;

  const debouncedEmail = useDebounce(formData.email, 800);

  useEffect(() => {
    if (
      debouncedEmail &&
      formData.firstName &&
      formData.lastName &&
      debouncedEmail !== lastCheckedEmail.current &&
      !createUserMutation.isPending
    ) {
      lastCheckedEmail.current = debouncedEmail;
      createUserMutation.mutate(
        {
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: debouncedEmail,
        },
        {
          onSuccess: (response) => {
            const { data } = response;
            if (data.isVerified) {
              setIsVerified(true);
              setShowVerification(false);
              setVerificationCode(data.verificationToken || "");
              if (data.accessToken) {
                setAuthToken(data.accessToken);
              }
            } else {
              setIsVerified(false);
              setShowVerification(true);
              setVerificationCode(data.verificationToken || "");
            }
            setEmailChecked(true);
          },
        },
      );
    }
  }, [debouncedEmail, formData.firstName, formData.lastName]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleEmailBlur = () => {
    if (
      formData.email &&
      formData.firstName &&
      formData.lastName &&
      formData.email !== lastCheckedEmail.current
    ) {
      lastCheckedEmail.current = formData.email;
      createUserMutation.mutate(
        {
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
        },
        {
          onSuccess: (response) => {
            const { data } = response;
            if (data.isVerified) {
              setIsVerified(true);
              setShowVerification(false);
              setVerificationCode(data.verificationToken || "");
              if (data.accessToken) {
                setAuthToken(data.accessToken);
              }
            } else {
              setIsVerified(false);
              setShowVerification(true);
              setVerificationCode(data.verificationToken || "");
            }
            setEmailChecked(true);
          },
        },
      );
    }
  };

  const handleVerify = () => {
    if (enteredCode && formData.email) {
      verifyEmailMutation.mutate(
        {
          email: formData.email,
          token: enteredCode,
        },
        {
          onSuccess: (response) => {
            const { data } = response;
            if (data.isVerified) {
              setIsVerified(true);
              setShowVerification(false);
              setVerificationCode("");
              setAlertMessage("Email verified successfully!");
              if (data.accessToken) {
                setAuthToken(data.accessToken);
              }
              createUserMutation.reset();
              verifyEmailMutation.reset();
            }
          },
        },
      );
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isVerified) return;

    const payload: CreateDemoRequestPayload = {
      jobTitle: formData.jobTitle,
      companyName: formData.companyName,
      country: formData.country,
      phoneNumber: formData.phoneNumber,
      companyWebsite: formData.companyWebsite || undefined,
      currentMonthlyProcessingVolume: formData.processingVolume
        ? parseFloat(formData.processingVolume)
        : undefined,
      howDidYouHearAboutEnif: formData.howDidYouHear || undefined,
      description: formData.description || undefined,
    };

    createDemoMutation.mutate(payload, {
      onSuccess: () => {
        setToast({
          message: "Demo request submitted successfully!",
          type: "success",
        });
        setFormData(initialFormData);
        setIsVerified(false);
        setEmailChecked(false);
        setAlertMessage("");
        setVerificationCode("");
        setEnteredCode("");
        lastCheckedEmail.current = "";
        createDemoMutation.reset();
      },
      onError: (error) => {
        setToast({ message: error.message, type: "error" });
      },
    });
  };

  const inputStyles =
    "w-full px-4 py-3 border border-gray-200 rounded-lg text-text focus:outline-none focus:border-primary";

  const disabledStyles =
    "w-full px-4 py-3 border border-gray-200 rounded-lg text-text focus:outline-none focus:border-primary disabled:bg-gray-100 disabled:cursor-not-allowed";

  return (
    <section className="py-20 bg-white">
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
      <div className="max-w-2xl mx-auto px-6">
        {alertMessage && (
          <div className="mb-6">
            <Alert message={alertMessage} onClose={() => setAlertMessage("")} />
          </div>
        )}
        {!isVerified && emailChecked && verificationCode && (
          <div className="mb-6">
            <Alert
              message={`Verification Code: ${verificationCode}`}
              onClose={() => setVerificationCode("")}
            />
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              value={formData.firstName}
              onChange={handleChange}
              className={inputStyles}
            />
            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              value={formData.lastName}
              onChange={handleChange}
              className={inputStyles}
            />
          </div>

          <div className="mb-4">
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              onBlur={handleEmailBlur}
              className={inputStyles}
            />
            {createUserMutation.isPending && (
              <p className="text-text-light text-sm mt-1">Checking email...</p>
            )}
            {createUserMutation.isError && (
              <p className="text-red-500 text-sm mt-1">
                {createUserMutation.error.message}
              </p>
            )}

            {emailChecked && showVerification && !isVerified && (
              <div className="flex gap-2 mt-2">
                <input
                  type="text"
                  placeholder="Enter verification code"
                  value={enteredCode}
                  onChange={(e) => setEnteredCode(e.target.value)}
                  className={`${inputStyles} flex-1`}
                />
                <button
                  type="button"
                  onClick={handleVerify}
                  disabled={verifyEmailMutation.isPending}
                  className="px-4 py-2 bg-primary text-secondary rounded-lg font-medium disabled:opacity-50"
                >
                  {verifyEmailMutation.isPending ? "Verifying..." : "Verify"}
                </button>
              </div>
            )}
            {verifyEmailMutation.isError && (
              <p className="text-red-500 text-sm mt-1">
                {verifyEmailMutation.error.message}
              </p>
            )}
          </div>

          <input
            type="text"
            name="jobTitle"
            placeholder="Job Title"
            value={formData.jobTitle}
            onChange={handleChange}
            disabled={!isFormEnabled}
            className={`${disabledStyles} mb-4`}
          />

          <input
            type="text"
            name="companyName"
            placeholder="Company Name"
            value={formData.companyName}
            onChange={handleChange}
            disabled={!isFormEnabled}
            className={`${disabledStyles} mb-4`}
          />

          <select
            name="country"
            value={formData.country}
            onChange={(e) => {
              handleChange(e);
              const country = countries.find((c) => c.code === e.target.value);
              if (country) setSelectedCountry(country);
            }}
            disabled={!isFormEnabled}
            className={`${disabledStyles} mb-4 bg-transparent`}
          >
            <option value="">Country</option>
            {countries.map((country) => (
              <option key={country.code} value={country.code}>
                {country.flag} {country.name}
              </option>
            ))}
          </select>

          <div
            className={`flex mb-4 border border-gray-200 rounded-lg ${!isFormEnabled ? "bg-gray-100" : ""}`}
          >
            <select
              value={selectedCountry.code}
              onChange={(e) => {
                const country = countries.find(
                  (c) => c.code === e.target.value,
                );
                if (country) setSelectedCountry(country);
              }}
              disabled={!isFormEnabled}
              className="px-3 py-3 bg-transparent text-text focus:outline-none appearance-none cursor-pointer disabled:cursor-not-allowed"
            >
              {countries.map((country) => (
                <option key={country.code} value={country.code}>
                  {country.flag}
                </option>
              ))}
            </select>
            <input
              type="tel"
              name="phoneNumber"
              placeholder="Enter Phone Number"
              value={formData.phoneNumber}
              onChange={handleChange}
              disabled={!isFormEnabled}
              className="flex-1 px-4 py-3 text-text focus:outline-none rounded-r-lg disabled:bg-gray-100 disabled:cursor-not-allowed"
            />
          </div>

          <input
            type="url"
            name="companyWebsite"
            placeholder="Company Website"
            value={formData.companyWebsite}
            onChange={handleChange}
            disabled={!isFormEnabled}
            className={`${disabledStyles} mb-4`}
          />

          <input
            type="text"
            name="processingVolume"
            placeholder="Current Monthly Processing Volume (USD)"
            value={formData.processingVolume}
            onChange={handleChange}
            disabled={!isFormEnabled}
            className={`${disabledStyles} mb-4`}
          />

          <select
            name="howDidYouHear"
            value={formData.howDidYouHear}
            onChange={handleChange}
            disabled={!isFormEnabled}
            className={`${disabledStyles} mb-4 bg-transparent`}
          >
            <option value="">How did you hear about Enif?</option>
            {howDidYouHearOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>

          <textarea
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleChange}
            disabled={!isFormEnabled}
            rows={4}
            className={`${disabledStyles} mb-8 resize-none`}
          />

          <Button
            type="submit"
            className="w-full py-4"
            disabled={!isFormEnabled || createDemoMutation.isPending}
          >
            {createDemoMutation.isPending ? "Submitting..." : "Request Demo"}
          </Button>
        </form>
      </div>
    </section>
  );
}

export default DemoForm;
