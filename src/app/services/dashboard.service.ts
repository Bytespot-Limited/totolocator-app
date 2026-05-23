import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environment';

export interface DateRange { from: Date; to: Date; }

export interface RecentTrip {
  id: number; tripType: string; tripStatus: string;
  startTime: string; endTime: string | null;
}
export interface RecentSchool { id: number; name: string; entityStatus: string; }
export interface RecentStudent { id: number; name: string; classLevel: string; billingStatus: string; }
export interface StudentBoardingItem {
  id: number; studentName: string; classLevel: string;
  boardingStatus: string; pickupTime: string | null;
}
export interface ChildStatus {
  id: number; name: string; classLevel: string; billingStatus: string;
  boardingStatus: string; fleetNumberPlate: string; lastTripDate: string | null;
}

export interface AdminDashboardData {
  totalSchools: number; activeSchools: number; inactiveSchools: number;
  totalTerminals: number; onlineTerminals: number; offlineTerminals: number;
  totalStudents: number; activeStudents: number; inactiveStudents: number;
  totalDrivers: number; activeDrivers: number;
  tripsInRange: number; tripsCompleted: number; tripsOngoing: number;
  dailyTripCounts: number[]; dailyTripLabels: string[];
  monthlyStudentTotals: number[]; monthlyPayingStudents: number[]; monthlyLabels: string[];
  recentTrips: RecentTrip[]; recentSchools: RecentSchool[];
}

export interface SchoolAdminDashboardData {
  totalDrivers: number; activeDrivers: number; inactiveDrivers: number;
  totalFleets: number; activeFleets: number; inactiveFleets: number;
  totalStudents: number; activeStudents: number; inactiveStudents: number;
  billingsPaid: number; billingsOverdue: number;
  tripsInRange: number; tripsCompleted: number;
  dailyTripCounts: number[]; dailyTripLabels: string[];
  monthlyStudentTotals: number[]; monthlyPayingStudents: number[]; monthlyLabels: string[];
  recentStudents: RecentStudent[]; recentTrips: RecentTrip[];
}

export interface DriverDashboardData {
  totalStudentsOnFleet: number;
  boardedInRange: number; pendingInRange: number; droppedOffInRange: number;
  tripsCompletedInRange: number; tripsTotalInRange: number;
  fleetNumberPlate: string; terminalStatus: string;
  dailyTripCounts: number[]; dailyTripLabels: string[];
  currentTripRoster: StudentBoardingItem[]; recentTrips: RecentTrip[];
}

export interface GuardianDashboardData {
  totalChildren: number; activeChildren: number;
  tripsInRange: number; tripsCompletedInRange: number;
  paidInvoices: number; overdueInvoices: number;
  dailyTripCounts: number[]; dailyTripLabels: string[];
  childrenStatus: ChildStatus[]; recentChildTrips: RecentTrip[];
}

@Injectable({ providedIn: 'root' })
export class DashboardService {
  private readonly base = `${environment.apiUrl}dashboard`;

  constructor(private http: HttpClient) {}

  defaultRange(): DateRange {
    const to = new Date();
    const from = new Date();
    const day = from.getDay();
    from.setDate(from.getDate() - (day === 0 ? 6 : day - 1));
    from.setHours(0, 0, 0, 0);
    return { from, to };
  }

  getAdminDashboard(range: DateRange): Observable<AdminDashboardData> {
    return this.http.get<AdminDashboardData>(`${this.base}/admin`, { params: this.params(range) });
  }

  getSchoolAdminDashboard(range: DateRange): Observable<SchoolAdminDashboardData> {
    return this.http.get<SchoolAdminDashboardData>(`${this.base}/school-admin`, { params: this.params(range) });
  }

  getDriverDashboard(range: DateRange): Observable<DriverDashboardData> {
    return this.http.get<DriverDashboardData>(`${this.base}/driver`, { params: this.params(range) });
  }

  getGuardianDashboard(range: DateRange): Observable<GuardianDashboardData> {
    return this.http.get<GuardianDashboardData>(`${this.base}/guardian`, { params: this.params(range) });
  }

  private params(range: DateRange): HttpParams {
    return new HttpParams()
      .set('from', range.from.toISOString())
      .set('to', range.to.toISOString());
  }
}
